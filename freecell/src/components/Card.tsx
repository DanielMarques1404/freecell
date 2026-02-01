import { useEffect, useState } from "react";
import { Card } from "../core/domain/entities/card";
import { useGame } from "../app/context/GameContext";

type CardProps = {
  card: Card;
  onclick?: (card: Card) => void;
};

export const CardImage = ({ card, onclick }: CardProps) => {
  const [localCard, setLocalCard] = useState<Card>(card);
  const { game, setGame } = useGame();

  useEffect(() => {
    setLocalCard(card);
  }, [card]);

  // const foldCard = () => {
  //   const newCard = new Card(localCard.suit, localCard.rank, !localCard.folded);
  //   setLocalCard(newCard);
  // };

  const handleClick = () => {
    game.moveNextContainer(card)
    setGame(game.copy())
  }

  return (
    <img
      onClick={handleClick}
      className="h-44 cursor-pointer border-2 border-gray-500 rounded-md hover:scale-105 transition-transform"
      src={localCard.getImagePath()}
      alt={localCard.getImagePath()}
    />
  );
};
