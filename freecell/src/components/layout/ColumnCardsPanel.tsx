import { useState } from "react";
import { useGame } from "../../app/context/GameContext";
import type { Card } from "../../core/domain/entities/card";
import { CardContainer } from "../CardContainer";
import { Caretaker } from "../../core/domain/memento";

export const ColumnCardsPanel = () => {
    const { game, setGame, backup, undo } = useGame();

    const handleClick = (card: Card) => {
        backup()
        if (!game.move(card, {container: "guard"})) undo()
        // console.log(x, card)
        setGame(game.copy())
    }
    
    return (
        <div className="grid grid-cols-8 gap-2 flex-wrap mt-4 mx-20">
          <CardContainer cards={game.getColumns()[0].getCards()} color={""} onclick={handleClick}/>
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