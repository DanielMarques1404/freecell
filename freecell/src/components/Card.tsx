import { useEffect, useState } from "react";
import { Card } from "../core/domain/entities/card";

type CardProps = {
  card?: Card;
  onclick?: (card: Card) => void;
};

export const CardImage = ({ card, onclick }: CardProps) => {
  const [localCard, setLocalCard] = useState<Card | undefined>(card);

  useEffect(() => {
    setLocalCard(card);
  }, [card]);

  const handleClick = () => {
    if (onclick && localCard) onclick(localCard)
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
