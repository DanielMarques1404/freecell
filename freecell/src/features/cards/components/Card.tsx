import { useEffect, useState } from "react";
import type { CardLocalization } from "../../game/domain/freecellGame";
import type { Card } from "../domain/card";

type CardProps = {
  card?: Card;
  onclick?: (card: Card, destination: CardLocalization) => void;
};

export const CardImage = ({ card, onclick }: CardProps) => {
  const [localCard, setLocalCard] = useState<Card | undefined>(card);

  useEffect(() => {
    setLocalCard(card);
  }, [card]);

  const handleClick = () => {
    if (onclick && localCard) onclick(localCard, {container: "pile", index: 1, innerIndex: 0})
  }

  if (!localCard) return ""

  return (
    <img
      onClick={handleClick}
      className={`h-44 min-w-32 cursor-pointer border-2 border-gray-500 rounded-md hover:scale-105 transition-transform `}
      src={localCard?.getImagePath()}
      alt={localCard?.getImagePath()}
    />
  );
};
