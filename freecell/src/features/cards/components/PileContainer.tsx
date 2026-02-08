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

export const PileContainer = ({ color }: CardContainerProps) => {
  const { game, setGame } = useGame();

  const handleDragStartFromPile = (
    event: React.DragEvent<HTMLLIElement>,
    card?: Card,
  ) => {
    if (!card) return;

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(CARD_MIME, "1");
    event.dataTransfer.setData(
      "card",
      JSON.stringify({ suit: card.suit, rank: card.rank }),
    );
  };

  const handleDragOverPile = (event: React.DragEvent<HTMLUListElement>) => {
    if (!isCardDrag(event.dataTransfer)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDropPile = (
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
      game.move(card, { container: "pile", index, innerIndex: 0 });
      setGame(game.copy());
    }
  };

  return (
    <div className="flex gap-2">
      {game.getPiles().map((pile, icol) => (
        <ul
          key={icol}
          className={`relative flex flex-col h-48 w-36 border-2 rounded-md ${bgColor(color)}`}
          onDragOver={handleDragOverPile}
          onDrop={(e) => handleDropPile(e, icol)}
        >
          {/* área vazia para hitbox */}
          {pile.getCards().length === 0 && (
            <li className="h-full w-full opacity-40 flex items-center justify-center text-xs">
              drop
            </li>
          )}

          {pile.getCards().map((card, idx) => (
            <li
              key={idx}
              className="absolute left-1 top-1"
              draggable
              onDragStart={(e) => handleDragStartFromPile(e, card)}
            >
              <CardImage card={card} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
