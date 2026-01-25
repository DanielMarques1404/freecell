import { Card, Deck } from "./card";

export type CardOrigin = {
  value: "deck" | "guard" | "pile" | "column" | null;
};

export class Game {
  private _guards: Card[] | undefined[] = [
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  private _piles: Card[][] = [[], [], [], []];
  private _columns: Card[][] = [[], [], [], [], [], [], [], []];
  private _deck: Deck;

  constructor(deck: Deck) {
    this._deck = deck;
    this.resetGame();
  }

  resetGame() {
    for (let i = 0; i < 8; i++) {
      this._columns[i] = [];
      for (let j = 0; j < 7; j++) {
        if (i > 3 && j > 5) break;
        const card = this._deck.getACard();
        if (card) this._columns[i].push(card);
      }
    }
    console.log('na classe',this._columns)
  }

  moveFromColumnToGuard(card: Card, guardIndex: number): boolean {
    if (this._guards[guardIndex] !== undefined) {
      return false;
    }
    if (guardIndex < 0 || guardIndex > 3) return false;

    this._guards[guardIndex] = card;
    for (let i = 0; i < this._columns.length; i++) {
      const cardIndex = this._columns[i].indexOf(card);
      if (cardIndex !== -1) {
        this._columns[i].splice(cardIndex, 1);
        break;
      }
    }
    
    return true;
  }

  moveFromColumnToPile(card: Card, pileIndex: number): boolean {
    const pile = this._piles[pileIndex];

    if (pile.length > 0 && pile[0].suit !== card.suit) {
      return false;
    }

    if (pile.length > 0 && card.compareTo(pile[pile.length - 1]) > 1) {
      return false;
    }

    // Adiciona à pilha
    pile.push(card);

    // Remove da coluna
    for (let i = 0; i < this._columns.length; i++) {
      const cardIndex = this._columns[i].indexOf(card);
      if (cardIndex !== -1) {
        this._columns[i].splice(cardIndex, 1);
        break;
      }
    }

    return true;
  }

  moveFromGuardToColumn(card: Card, columnIndex: number): boolean {
    if (this._columns[columnIndex].length >= 7) {
      return false;
    }
    this._columns[columnIndex].push(card);
    for (let i = 0; i < this._guards.length; i++) {
      if (this._guards[i] === card) {
        this._guards[i] = undefined;
        break;
      }
    }
    return true;
  }

  getColumns(): Card[][] {
    return this._columns;
  }

  getPiles(): Card[][] {
    return this._piles;
  }

  getGuards(): (Card | undefined)[] {
    return this._guards;
  }

  getColumn(index: number): Card[] {
    return this._columns[index];
  }  
  
  getPile(index: number): Card[] {
    return this._piles[index];
  }

  getGuard(index: number): Card | undefined {
    return this._guards[index];
  }

  getDeck(): Deck {
    return this._deck
  }

}
