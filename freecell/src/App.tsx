import "./App.css";
import { DeckProvider } from "./app/context/DeckContext";
import { AppContent } from "./AppContent";

function App() {
  return (
    <DeckProvider>
      <AppContent />
    </DeckProvider>
  );
}

export default App;
