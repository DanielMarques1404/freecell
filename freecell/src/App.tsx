import "./App.css";
import { GameProvider } from "./app/context/GameContext";
import { ColumnContainer } from "./features/cards/components/ColumnContainer";
import { GuardContainer } from "./features/cards/components/GuardContainer";
import { InfoPanel } from "./features/cards/components/InfoPanel";
import { PileContainer } from "./features/cards/components/PileContainer";

function App() {
  return (
    <GameProvider>
      <div className="flex flex-col p-4 gap-4 h-screen bg-green-700">
        <InfoPanel />
        <div className="flex justify-between">
          <GuardContainer color={"dark"} />
          <PileContainer color={"light"} />
        </div>
        <div className="flex-1 w-full">
          <ColumnContainer color={""} />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
