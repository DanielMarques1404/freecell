import { useGame } from "./app/context/GameContext";
import { CardContainer } from "./components/CardContainer";
import { InfoPanel } from "./components/layout/InfoPanel";
import { RestCardsPanel } from "./components/layout/RestCardsPanel";

export const AppContent = () => {
  const { game, setGame } = useGame();

  const handleMove = () => {
    game.moveFromColumnToGuard(game.getColumn(2)[game.getColumn(2).length - 1]);
    setGame(game.copy()); // Cria nova instância
  };
  const handleMove1 = () => {
    game.moveFromColumnToPile(
      game.getColumn(2)[game.getColumn(2).length - 1]);
    setGame(game.copy()); // Cria nova instância
  };

  return (
    <div className="flex flex-col gap-2 h-screen p-4 bg-green-700">
      <InfoPanel />
      <RestCardsPanel />
      <div className="flex-1">
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
      </div>
      <div className="flex border-2 border-green-400">
        <button className="border-2 border-gray-600" onClick={handleMove}>
          Coluna para Guard
        </button>
        <button className="border-2 border-gray-600" onClick={handleMove1}>
          Coluna para Pile
        </button>
        {/* <button className="border-2 border-gray-600" onClick={}>Guard para Pile</button> */}
      </div>
    </div>
  );
};
