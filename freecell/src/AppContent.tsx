import { useEffect } from "react";
import { useGame } from "./app/context/GameContext";
import { CardContainer } from "./components/CardContainer";
import { InfoPanel } from "./components/layout/InfoPanel";
import { RestCardsPanel } from "./components/layout/RestCardsPanel";

export const AppContent = () => {
  const { game } = useGame();

  // useEffect(() => {
  //   game.resetGame();
  //   console.log(game.getColumns())
  // }, []);


  return (
    <div className="flex flex-col gap-2 h-screen p-4 bg-green-700">
      <InfoPanel />
      <RestCardsPanel />
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
  );
};
