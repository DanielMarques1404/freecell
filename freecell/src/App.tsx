import { useState } from "react";
import "./App.css";
import { FreeCellGame, type CardLocalization } from "./features/game/domain/freecellGame";
import { CardContainer } from "./features/cards/components/Container";
import { InfoPanel } from "./components/layout/InfoPanel";
import type { Card } from "./features/cards/domain/card";

function App() {
  const [game, setGame] = useState<FreeCellGame>(new FreeCellGame());

  const handleCG = (card: Card, destination: CardLocalization) => {
    game.move(card, destination)
    setGame(game.copy())
  }

  return (
    // <GameProvider>
    //   <AppContent />
    // </GameProvider>
    <div className="flex flex-col gap-4 p-4 bg-green-700 h-screen">
      {/* <div className="flex h-12">
        PLACAR
      </div> */}
      <InfoPanel />
      <div className="flex justify-between">
        <div className="flex gap-4">
          {game.getGuards().map(guard => <CardContainer color={"dark"} container={guard} />)}
        </div>
        <div className="flex gap-4">
          {game.getPiles().map(pile => <CardContainer color={"light"} container={pile} />)}
        </div>
      </div>
      <div className="flex flex-1 justify-between mx-8">
        {game.getColumns().map(column => <CardContainer color={""} container={column} />)}
      </div>
      {/* <button onClick={handleCG}>Column - Guard</button> */}
    </div>
  );
}

export default App;
