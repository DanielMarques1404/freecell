import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Deck } from "../../core/domain/entities/card";

type DeckContextType = {
  deck: Deck;
  setDeck: (deck: Deck) => void;
};

export const DeckContext = createContext<DeckContextType | undefined>(
  undefined,
);

export const DeckProvider = ({ children }: { children: ReactNode }) => {
  const [deck, setDeck] = useState<Deck>(new Deck(true, false));

  return (
    <DeckContext.Provider value={{ deck, setDeck }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error("useDeck deve ser usado dentro de DeckProvider");
  }
  return context;
};
