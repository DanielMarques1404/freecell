import { useGame } from "../../../app/context/GameContext";
import { Card } from "../domain/card";
import { bgColor, type CardContainerProps } from "../types";
import { CardImage } from "./Card";

const CARD_MIME = "application/x-freecell-card";

function isCardDrag(dt: DataTransfer) {
  return Array.from(dt.types).includes(CARD_MIME);
}

const SUITS = ["hearts", "diamonds", "clubs", "spades"] as const;
type Suit = (typeof SUITS)[number];

function isSuit(x: string): x is Suit {
  return (SUITS as readonly string[]).includes(x);
}

export const ColumnContainer = ({ color }: CardContainerProps) => {
  const { game, setGame } = useGame();

  const handleDragStartFromColumn = (
    event: React.DragEvent<HTMLLIElement>,
    card?: Card,
  ) => {
    if (!card) return;

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(CARD_MIME, "1"); // marker
    event.dataTransfer.setData(
      "card",
      JSON.stringify({ suit: card.suit, rank: card.rank }),
    );
  };

  const handleDragOverColumn = (event: React.DragEvent<HTMLUListElement>) => {
    if (!isCardDrag(event.dataTransfer)) return;
    event.preventDefault(); // habilita drop
    event.dataTransfer.dropEffect = "move";
  };

  const handleDropColumn = (
    event: React.DragEvent<HTMLUListElement>,
    index: number,
  ) => {
    if (!isCardDrag(event.dataTransfer)) return;
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer.getData("card")) as {
      suit: string;
      rank: number;
    };

    if (isSuit(data.suit) && Number.isFinite(data.rank)) {
      const card = new Card(data.suit, data.rank);
      game.move(card, { container: "column", index, innerIndex: 0 });
      setGame(game.copy());
    }
  };

  return (
    <div className={`grid grid-cols-8 gap-2 p-1`}>
      {game.getColumns().map((column, icol) => (
        <ul
          key={icol}
          className={`relative h-48 w-36 rounded-md p-1 ${bgColor(color)}`}
          onDragOver={handleDragOverColumn}
          onDrop={(e) => handleDropColumn(e, icol)}
        >
          {/* área “vazia” para garantir hitbox */}
          {column.getCards().length === 0 && (
            <li className="h-full w-full rounded-sm opacity-40 flex items-center justify-center text-xs border-2 border-red-800">
              drop
            </li>
          )}

          {column.getCards().map((card, idx) => (
            <li
              key={idx}
              className="absolute flex items-center justify-center p-1 left-0"
              style={{ top: `${idx * 36}px` }}
              draggable
              onDragStart={(e) => handleDragStartFromColumn(e, card)}
            >
              <CardImage card={card} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
