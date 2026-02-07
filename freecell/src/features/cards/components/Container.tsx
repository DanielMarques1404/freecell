import { useEffect, useState } from "react";
import type { Container } from "../../game/domain/containers";
import type { Card } from "../domain/card";
import { CardImage } from "./Card";

type CardContainerProps = {
  color: "light" | "dark" | "";
  over?: boolean;
  container: Container;
  onclick?: (card: Card) => void;
};

export const CardContainer = ({
  color,
  over = false,
  container,
  onclick,
}: CardContainerProps) => {
  const [localContainer, setLocalContainer] = useState<Container>(container);

  useEffect(() => {
    setLocalContainer(container);
  }, [container]);

  const bgColor =
    color === "light"
      ? "border-gray-400 border-4 rounded-2xl"
      : color === "dark"
        ? "border-gray-600 border-4 rounded-2xl"
        : "";

  return (
    <div
      className={`relative flex items-center justify-center w-36 h-48 p-1 ${bgColor}`}
    >
      <ul>
        {localContainer &&
          localContainer.getCards().map((card, index) => (
            <li
              className="absolute flex items-center justify-center p-1 left-0"
              style={{ top: `${over ? 0 : index * 36}px` }}
              key={index}
              draggable={true}
            >
              <CardImage card={card} onclick={onclick} />
            </li>
          ))}
      </ul>
    </div>
  );
};
