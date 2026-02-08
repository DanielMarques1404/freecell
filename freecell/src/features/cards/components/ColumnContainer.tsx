import { useGame } from "../../../app/context/GameContext";
import { Card } from "../domain/card";
import { bgColor, type CardContainerProps } from "../types";
import { CardImage } from "./Card";

export const ColumnContainer = ({ color }: CardContainerProps) => {
  const { game, setGame } = useGame();

  const handleDragOverTarget = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const SUITS = ["hearts", "diamonds", "clubs", "spades"] as const;
  type Suit = (typeof SUITS)[number];

  function isSuit(x: string): x is Suit {
    return (SUITS as readonly string[]).includes(x);
  }

  const handleDragStartFromColumn = (
    event: React.DragEvent<HTMLLIElement>,
    card?: Card,
  ) => {
    if (!card) return;

    console.log("Dragging: ", card);
    event.dataTransfer.effectAllowed = "move";

    event.dataTransfer.setData("text/plain", card.toString());
    event.dataTransfer.setData(
      "card",
      JSON.stringify({ suit: card.suit, rank: card.rank }),
    );
  };

  const handleDragDropColumn = (
    event: React.DragEvent<HTMLUListElement>,
    index: number,
  ) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("card")) as {
      suit: string;
      rank: number;
    };

    if (isSuit(data.suit) && Number.isFinite(data.rank)) {
      const card = new Card(data.suit, data.rank);
      game.move(card, { container: "column", index: index, innerIndex: 0 });
      setGame(game.copy());
    }
  };

  return (
    <div className={`grid grid-cols-8 gap-2 p-1 ${bgColor(color)}`}>
      {game.getColumns().map((column, icol) => (
        <ul
          className="relative flex flex-col"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDragDropColumn(e, icol)}
        >
          {column.getCards().map((card, idx) => (
            <li
              key={idx}
              className="absolute flex items-center justify-center p-1 left-0"
              style={{ top: `${idx * 36}px` }}
              draggable={true}
              onDragStart={(e) => handleDragStartFromColumn(e, card)}
              onDragOver={handleDragOverTarget}
            >
              <CardImage card={card} />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
