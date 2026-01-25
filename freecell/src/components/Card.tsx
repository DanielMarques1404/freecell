import { useEffect, useState } from "react";
import { Card } from "../core/domain/entities/card";

type CardProps = {
  card: Card;
};

export const CardImage = ({ card }: CardProps) => {
  const [localCard, setLocalCard] = useState<Card>(card);

  useEffect(() => {
    setLocalCard(card);
  }, [card]);

  const foldCard = () => {
    const newCard = new Card(localCard.suit, localCard.rank, !localCard.folded);
    setLocalCard(newCard);
  };

  return (
    <img
      onClick={foldCard}
      className="h-44 cursor-pointer border-2 border-gray-500 rounded-md hover:scale-105 transition-transform"
      src={localCard.getImagePath()}
      alt={localCard.getImagePath()}
    />
  );
};
