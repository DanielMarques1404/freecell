import { useGame } from "../../app/context/GameContext";
import { CardContainer } from "../CardContainer";

export const ColumnCardsPanel = () => {
    const { game } = useGame();
    
    return (
        <div className="grid grid-cols-8 gap-2 flex-wrap mt-4 mx-20">
          <CardContainer cards={game.getColumns()[0].getCards()} color={""} />
          <CardContainer cards={game.getColumns()[1].getCards()} color={""} />
          <CardContainer cards={game.getColumns()[2].getCards()} color={""} />
          <CardContainer cards={game.getColumns()[3].getCards()} color={""} />
          <CardContainer cards={game.getColumns()[4].getCards()} color={""} />
          <CardContainer cards={game.getColumns()[5].getCards()} color={""} />
          <CardContainer cards={game.getColumns()[6].getCards()} color={""} />
          <CardContainer cards={game.getColumns()[7].getCards()} color={""} />
        </div>
    );
}