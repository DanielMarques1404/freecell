import { useState } from "react";
import { useGame } from "../../../app/context/GameContext";
import { ToggleButton } from "../../../components/ui/Toggle";

export const InfoPanel = () => {
    const { game, setAutoMove, undo } = useGame();
    const [autoMoveCheck, setAutoMoveCheck] = useState(false);

    const handleChangeAutoMove = () => {
        setAutoMove(!autoMoveCheck)
        setAutoMoveCheck(!autoMoveCheck)
    }

    const handleUndo = () => {
        undo()
    }

    return (
        <div className="flex items-center justify-between text-3xl text-white font-bold p-1">
            <span>{`Moves: ${game.getMovesCounter()}`}</span>
            <span className="flex gap-2 items-center justify-center">
                <label htmlFor="autoMoveCheck">Auto Move</label>
                <ToggleButton toggle={handleChangeAutoMove} state={autoMoveCheck}/>
            </span>
            <button className="border-2 rounded-2xl px-3 cursor-pointer" onClick={handleUndo}>Undo</button>
            <span>Time</span>
        </div>
    );
}