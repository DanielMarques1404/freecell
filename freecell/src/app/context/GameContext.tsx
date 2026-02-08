import { createContext, useContext, useState, type ReactNode } from "react";
import { FreeCellGame } from "../../features/game/domain/freecellGame";

type GameContextType = {
  game: FreeCellGame;
  // caretaker: Caretaker;
  setGame: (game: FreeCellGame) => void;
  // backup: () => void;
  // undo: () => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<FreeCellGame>(new FreeCellGame());
  // const [caretaker, _] = useState<Caretaker>(new Caretaker(game));

  // const backup = () => {
  //   caretaker.backup()
  // }

  // const undo = () => {
  //   caretaker.undo()
  // }

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame deve ser usado dentro de GameProvider");
  }
  return context;
};
