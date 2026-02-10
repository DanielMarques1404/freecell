import { useState } from "react";
import { useGame } from "../../../app/context/GameContext";

export const InfoPanel = () => {
    const { game, setGame } = useGame();
    const [autoMove, setAutoMove] = useState(game.getAutoMove());

    const handleChangeAutoMove = () => {
        console.log('3')
        setAutoMove(!autoMove)
        game.setAutoMove(!autoMove)
        setGame(game.copy())
    }

    return (
        <div className="flex items-center justify-between text-3xl text-white font-bold p-1">
            <span>{`Moves: ${game.getMovesCounter()}`}</span>
            <span className="flex gap-2 items-center justify-center">
                <label htmlFor="autoMoveCheck">Auto Move</label>
                <input id="autoMoveCheck" type="checkbox" checked={autoMove} onChange={handleChangeAutoMove}/>
            </span>
            <span>Time</span>
        </div>
    );
}