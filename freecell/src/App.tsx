import "./App.css";
import { GameProvider } from "./app/context/GameContext";
import { AppContent } from "./AppContent";

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
