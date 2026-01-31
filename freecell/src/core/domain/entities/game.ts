import { Card, Deck } from "./card";

export type CardOrigin = {
  value: "deck" | "guard" | "pile" | "column" | null;
};

export class Game {
  readonly MAX_GUARDS = 4;

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
  }

  moveFromColumnToGuard(card: Card): boolean {
    const guardIndex = this._guards.findIndex((guard) => guard === undefined);
    if (guardIndex === -1) return false;

    this._guards[guardIndex] = card;
    this.removeFromColumns(card);

    return true;
  }

  private removeFromColumns(card: Card) {
    for (let i = 0; i < this._columns.length; i++) {
      const cardIndex = this._columns[i].indexOf(card);
      if (cardIndex !== -1) {
        this._columns[i].splice(cardIndex, 1);
        break;
      }
    }
  }

  private removeFromGuard(card: Card) {
    for (let i = 0; i < this._guards.length; i++) {
      if (this._guards[i] && this._guards[i]!.equals(card)) {
        this._guards[i] = undefined;
        break;
      }
    }
  }

  getPileToMove(card: Card): Card[] | null {
    let pileIndex = this._piles.findIndex(
      (pile) => pile.length > 0 && pile[0].suit === card.suit,
    );

    if (pileIndex === -1) {
      if (card.rank != 1) return null;
      pileIndex = this._piles.findIndex((pile) => pile.length === 0);
    }

    const pile = this._piles[pileIndex];

    if (pile.length > 0 && card.compareTo(pile[pile.length - 1]) > 1) {
      return null;
    }

    return pile;
  }

  moveFromColumnToPile(card: Card): boolean {
    const pile = this.getPileToMove(card);
    if (!pile) return false;

    pile.push(card);
    this.removeFromColumns(card);

    return true;
  }

  moveFromGuardToColumn(card: Card, columnIndex: number): boolean {
    if (this._columns[columnIndex].length >= 7) {
      return false;
    }
    this._columns[columnIndex].push(card);
    this.removeFromGuard(card);
    return true;
  }

  moveFromGuardToPile(card: Card): boolean {
    const pile = this.getPileToMove(card);
    if (!pile) return false;

    pile.push(card);
    this.removeFromGuard(card);

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
    return this._deck;
  }

  copy(): Game {
    const copiedGame = Object.create(Game.prototype);
    copiedGame._deck = this._deck;
    copiedGame._guards = [...this._guards];
    copiedGame._piles = this._piles.map((pile) => [...pile]);
    copiedGame._columns = this._columns.map((column) => [...column]);
    return copiedGame;
  }
}
