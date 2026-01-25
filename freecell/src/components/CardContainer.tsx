import type { Card } from "../core/domain/entities/card";
import { CardImage } from "./Card";

type CardContainerProps = {
  color: "light" | "dark" | "";
  cards?: Card[];
};

export const CardContainer = ({ color, cards }: CardContainerProps) => {
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
        {cards &&
          cards.map((card, index) => (
            <li
              className="absolute flex items-center justify-center p-1 left-0"
              style={{ top: `${index * 36}px` }}
              key={index}
              draggable={true}
            >
              <CardImage card={card} />
            </li>
          ))}
      </ul>
    </div>
  );
};
