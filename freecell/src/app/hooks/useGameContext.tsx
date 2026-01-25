import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("Contexto não disponível");
  }
  return context;
};
