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

export const GuardContainer = ({ color }: CardContainerProps) => {
  const { game, setGame } = useGame();

  const handleDragOverGuard = (event: React.DragEvent<HTMLLIElement>) => {
    if (!isCardDrag(event.dataTransfer)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDropGuard = (
    event: React.DragEvent<HTMLLIElement>,
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
      game.move(card, { container: "guard", index, innerIndex: 0 });
      setGame(game.copy());
    }
  };

  const handleDragStartFromGuard = (
    event: React.DragEvent<HTMLLIElement>,
    index: number,
  ) => {
    const card = game.getGuards()[index].getCards()[0];
    if (!card) return;

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(CARD_MIME, "1");
    event.dataTransfer.setData(
      "card",
      JSON.stringify({ suit: card.suit, rank: card.rank }),
    );
  };

  return (
    <ul className="grid grid-cols-4 gap-2 p-1">
      {game.getGuards().map((guard, idx) => (
        <li
          key={idx}
          className={`flex items-center justify-center h-48 w-36 border-2 rounded-md ${bgColor(color)}`}
          draggable
          onDragStart={(e) => handleDragStartFromGuard(e, idx)}
          onDragOver={handleDragOverGuard}
          onDrop={(e) => handleDropGuard(e, idx)}
        >
          <CardImage card={guard.getCards()[0]} />
        </li>
      ))}
    </ul>
  );
};
