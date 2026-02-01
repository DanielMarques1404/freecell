import { useGame } from "./app/context/GameContext";
import { ColumnCardsPanel } from "./components/layout/ColumnCardsPanel";
import { InfoPanel } from "./components/layout/InfoPanel";
import { RestCardsPanel } from "./components/layout/RestCardsPanel";

export const AppContent = () => {
  const { game, setGame } = useGame();

  const handleMove = () => {
    game.moveFromColumnToGuard(game.getColumn(2)[game.getColumn(2).length - 1]);
    setGame(game.copy());
  };
  
  const handleMove1 = () => {
    game.moveFromColumnToPile(
      game.getColumn(2)[game.getColumn(2).length - 1]);
    setGame(game.copy());
  };

  const handleMove2 = () => {
    game.moveFromGuardToPile(game.getGuard(0)!);
    setGame(game.copy());
  };

  // const handleClickCard = (card: Card) => {
  //   game.getColumns().forEach(column => {
  //     if (column[column.length-1] === card) {
  //       if ( card.compareTo(column[column.length-1]) === 1) { //criar método para decidir para onde a carta vai
  //         game.moveFromColumnToPile(card);
  //         setGame(game.copy());
  //         return;
  //       }
  //       game.moveFromColumnToGuard(card);
  //       setGame(game.copy());
  //       return;
  //     }
  //   })
  //   console.log(`Card clicked: ${card.suit} ${card.rank}`);
  // }

  return (
    <div className="flex flex-col gap-2 h-screen p-4 bg-green-700">
      <InfoPanel />
      <RestCardsPanel />
      <div className="flex-1">
        <ColumnCardsPanel />
      </div>
      <div className="flex border-2 border-green-400">
        <button className="border-2 border-gray-600" onClick={handleMove}>
          Coluna para Guard
        </button>
        <button className="border-2 border-gray-600" onClick={handleMove1}>
          Coluna para Pile
        </button>
        <button className="border-2 border-gray-600" onClick={handleMove2}>Guard para Pile</button>
      </div>
    </div>
  );
};
