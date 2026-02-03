import type { Card } from "../../core/domain/entities/card";
import { CardContainer } from "../CardContainer";

type Props = {
  guards: (Card | undefined)[];
  piles?: (Card | undefined)[][];
};

export const RestCardsPanel = ({ guards, piles }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {guards.map((card, index) => (
          <CardContainer key={`g-${index}`} cards={[card]} color="dark"/>
        ))}
      </div>
      <div className="flex gap-2">
        {piles?.map((pile, index) => (
            <CardContainer key={`p-${index}`} cards={pile} color="light" />
        ))}
      </div>
    </div>
  );
};
