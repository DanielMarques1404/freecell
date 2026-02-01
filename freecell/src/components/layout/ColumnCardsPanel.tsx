import { useGame } from "../../app/context/GameContext";
import { CardContainer } from "../CardContainer";

export const ColumnCardsPanel = () => {
    const { game } = useGame();
    
    return (
        <div className="grid grid-cols-8 gap-2 flex-wrap mt-4 mx-20">
          <CardContainer cards={game.getColumn(0)} color={""} />
          <CardContainer cards={game.getColumn(1)} color={""} />
          <CardContainer cards={game.getColumn(2)} color={""} />
          <CardContainer cards={game.getColumn(3)} color={""} />
          <CardContainer cards={game.getColumn(4)} color={""} />
          <CardContainer cards={game.getColumn(5)} color={""} />
          <CardContainer cards={game.getColumn(6)} color={""} />
          <CardContainer cards={game.getColumn(7)} color={""} />
        </div>
    );
}