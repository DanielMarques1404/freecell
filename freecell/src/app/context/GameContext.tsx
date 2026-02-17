import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Card } from "../../features/cards/domain/card";
import {
  FreeCellGame,
  type CardLocalization,
} from "../../features/game/domain/freecellGame";
import { Caretaker } from "../../features/game/domain/memento";

type GameContextType = {
  game: FreeCellGame;
  setAutoMove: (value: boolean) => void;
  move: (card: Card, destination: CardLocalization) => boolean;
  backup: () => void;
  undo: () => void;
  refresh: () => void; 
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const gameRef = useRef<FreeCellGame>(new FreeCellGame());
  const caretakerRef = useRef<Caretaker>(new Caretaker(gameRef.current));

  const [, bump] = useState(0);
  const refresh = () => bump((v) => v + 1);

  const backup = () => {
    caretakerRef.current.backup();
  };

  const undo = () => {
    caretakerRef.current.undo();
    refresh();
  };

  const move = (card: Card, destination: CardLocalization) => {
    const game = gameRef.current;

    const origin = game.getCardLocalization(card);
    if (origin.container === "" || origin.index < 0) return false;

    if (
      origin.container === destination.container &&
      origin.index === destination.index
    ) {
      return false;
    }

    if (!game.canMove(card, origin, destination)) return false;

    caretakerRef.current.backup();

    const ok = game.move(card, destination);
    if (ok) refresh();
    return ok;
  };

  const setAutoMove = (value: boolean) => {
    gameRef.current.setAutoMove(value);
  }

  const value = {
    game: gameRef.current,
    setAutoMove,
    move,
    backup,
    undo,
    refresh,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context)
    throw new Error("useGame deve ser usado dentro de GameProvider");
  return context;
};
