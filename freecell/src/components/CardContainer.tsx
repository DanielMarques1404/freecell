import { type PropsWithChildren } from "react";
import type { Card } from "../core/domain/entities/card";
import { CardImage } from "./Card";

type CardContainerProps = PropsWithChildren & {
  color: "light" | "dark";
};

export const CardContainer = ({ color, children }: CardContainerProps) => {
  const bgColor = color === "light" ? "border-gray-200" : "border-gray-400";
  return (
    <div
      className={`flex items-center justify-center w-32 h-48 border-4  rounded-2xl p-1 ${bgColor}`}
    >
      {children}
    </div>
  );
};

export const MultipleCardContainer = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="relative w-32 h-auto">
      {cards && cards.map((card, index) => (
        <div
          className="absolute left-0"
          style={{ top: `${index * 36}px` }}
          key={index}
        >
          <CardImage card={card} />
        </div>
      ))}
    </div>
  );
};
