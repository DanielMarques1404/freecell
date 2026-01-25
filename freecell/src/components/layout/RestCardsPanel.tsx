import { useGame } from "../../app/context/GameContext";
import { CardContainer } from "../CardContainer";


export const RestCardsPanel = () => {
  const { game } = useGame();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {game.getGuards().map((card, index) => (
          <CardContainer
            key={index}
            cards={card ? [card] : []}
            color={"dark"}
          />
        ))}
      </div>
      <div className="flex gap-2">
        {game.getPiles().map((card, index) => (
          <CardContainer key={index} cards={card ? card : []} color={"light"} />
        ))}
      </div>
    </div>
  );
};
