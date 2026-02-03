import { createContext, useContext, useState, type ReactNode } from "react";
import { Deck } from "../../core/domain/entities/card";
import { Game } from "../../core/domain/entities/game-tools";

type GameContextType = {
  game: Game;
  setGame: (game: Game) => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game, setGame] = useState<Game>(new Game(new Deck(true, false)));

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
