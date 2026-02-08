import { useGame } from "../../../app/context/GameContext";
import { Card } from "../domain/card";
import { bgColor, type CardContainerProps } from "../types";
import { CardImage } from "./Card";

export const PileContainer = ({ color }: CardContainerProps) => {
  const { game, setGame } = useGame();

  const handleDragOverTarget = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const SUITS = ["hearts", "diamonds", "clubs", "spades"] as const;
  type Suit = (typeof SUITS)[number];

  function isSuit(x: string): x is Suit {
    return (SUITS as readonly string[]).includes(x);
  }

  const handleDragStartFromPile = (
    event: React.DragEvent<HTMLLIElement>,
    card?: Card,
  ) => {
    console.log("passando 4");
    if (!card) return;

    console.log("Dragging: ", card);
    event.dataTransfer.effectAllowed = "move";

    event.dataTransfer.setData("text/plain", card.toString());
    event.dataTransfer.setData(
      "card",
      JSON.stringify({ suit: card.suit, rank: card.rank }),
    );
  };

  const handleDragDropPile = (
    event: React.DragEvent<HTMLUListElement>,
    index: number,
  ) => {
    console.log("passando 3");
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("card")) as {
      suit: string;
      rank: number;
    };

    if (isSuit(data.suit) && Number.isFinite(data.rank)) {
      const card = new Card(data.suit, data.rank);
      game.move(card, { container: "pile", index: index, innerIndex: 0 });
      setGame(game.copy());
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {game.getPiles().map((pile, icol) => (
        <ul
          key={icol}
          className={`relative flex flex-col items-center justify-center h-48 w-36 border-2 ${bgColor(color)}`}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => handleDragDropPile(e, icol)}
        >
          {pile.getCards().map((card, idx) => (
            <li
              key={idx}
              className="absolute top-1 flex items-center justify-center"
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
