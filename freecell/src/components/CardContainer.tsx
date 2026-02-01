import { useEffect, useState } from "react";
import type { Card } from "../core/domain/entities/card";
import { CardImage } from "./Card";

type CardContainerProps = {
  color: "light" | "dark" | "";
  over?: boolean;
  cards?: Card[];
  onclick?: (card: Card) => void;
};

export const CardContainer = ({
  color,
  over = false,
  cards,
  onclick,
}: CardContainerProps) => {
  const [localCards, setLocalCards] = useState<Card[] | undefined>(cards);

  useEffect(() => {
    setLocalCards(cards)
  }, [cards])

  const bgColor =
    color === "light"
      ? "border-gray-400 border-4 rounded-2xl"
      : color === "dark"
        ? "border-gray-600 border-4 rounded-2xl"
        : "";

  return (
    <div
      className={`relative flex items-center justify-center w-32 h-48 p-1 ${bgColor}`}
    >
      <ul>
        {localCards &&
          localCards.map((card, index) => (
            <li
              className="absolute flex items-center justify-center p-1 left-0"
              style={{ top: `${over ? 0 : index * 36}px` }}
              key={index}
              draggable={false}
            >
              <CardImage card={card} onclick={onclick && onclick} />
            </li>
          ))}
      </ul>
    </div>
  );
};
