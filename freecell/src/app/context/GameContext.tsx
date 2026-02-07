import { createContext, useContext, useState, type ReactNode } from "react";
import { Deck } from "../../core/domain/entities/card";
import { Game } from "../../core/domain/entities/game-tools";
import { Caretaker } from "../../core/domain/memento";

type GameContextType = {
  game: Game;
  caretaker: Caretaker;
  setGame: (game: Game) => void;
  backup: () => void;
  undo: () => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(new Game(new Deck(true, false)));
  const [caretaker, _] = useState<Caretaker>(new Caretaker(game));

  const backup = () => {
    caretaker.backup()
  }

  const undo = () => {
    caretaker.undo()
  }

  return (
    <GameContext.Provider value={{ game, caretaker, setGame, backup, undo }}>
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
