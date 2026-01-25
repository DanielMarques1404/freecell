import { useEffect, useState } from "react";
import { useDeck } from "./app/context/DeckContext";
import {
  CardContainer,
  MultipleCardContainer,
} from "./components/CardContainer";
import { Card } from "./core/domain/entities/card";

export const AppContent = () => {
  const { deck } = useDeck();
  const [containerCards, setContainerCards] = useState<Card[][]>([]);
  //   const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    console.log("AppContent - deck.cards:", deck.cards.length);
    if (deck.cards.length > 0) initiateContainers();
  }, [deck]);

  const initiateContainers = () => {
    const newContainerCards: Card[][] = [];
    for (let i = 0; i < 9; i++) {
      newContainerCards[i] = [];
      for (let j = 0; j < 7; j++) {
        if (i > 3 && j > 5) break;
        const card = deck.getACard();
        if (card) newContainerCards[i].push(card);
      }
    }
    console.log("Containers initialized", newContainerCards);
    setContainerCards(newContainerCards);
  };

  return (
    <div className="flex flex-col gap-2 h-screen p-4 bg-green-700">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <CardContainer color={"dark"} />
          <CardContainer color={"dark"} />
          <CardContainer color={"dark"} />
          <CardContainer color={"dark"} />
        </div>
        <div className="flex gap-2">
          <CardContainer color={"light"} />
          <CardContainer color={"light"} />
          <CardContainer color={"light"} />
          <CardContainer color={"light"} />
        </div>
      </div>
      <div className="grid grid-cols-8 gap-2 flex-wrap mt-8 mx-20">
        <MultipleCardContainer cards={containerCards[0]} />
        <MultipleCardContainer cards={containerCards[1]} />
        <MultipleCardContainer cards={containerCards[2]} />
        <MultipleCardContainer cards={containerCards[3]} />
        <MultipleCardContainer cards={containerCards[4]} />
        <MultipleCardContainer cards={containerCards[5]} />
        <MultipleCardContainer cards={containerCards[6]} />
        <MultipleCardContainer cards={containerCards[7]} />
      </div>
    </div>
  );
};
