import { useGame } from "../../../app/context/GameContext";

export const InfoPanel = () => {
    const { game } = useGame();

    return (
        <div className="flex items-center justify-between text-3xl text-white font-bold p-1">
            <span>{`Moves: ${game.getMovesCounter()}`}</span>
            <span>Time</span>
        </div>
    );
}