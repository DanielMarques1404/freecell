import { Card, Deck } from "./card";

type CardOrigin = {
  container: "deck" | "guard" | "pile" | "column";
  column: number;
  index: number;
};

export class Game {
  readonly MAX_GUARDS = 4;

  private _guards: (Card | undefined)[] = [
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

  getCardOrigin(card: Card): CardOrigin {
    if (this._guards.includes(card)) {
      return {
        container: "guard",
        column: -1,
        index: this._guards.findIndex((g) => g?.equals(card)),
      };
    }

    for (let i = 0; i < this._piles.length; i++) {
      if (this._piles[i].includes(card)) {
        return {
          container: "pile",
          column: i,
          index: this._piles[i].findIndex((c) => c.equals(card)),
        };
      }
    }

    for (let i = 0; i < this._columns.length; i++) {
      if (this._columns[i].includes(card)) {
        return {
          container: "column",
          column: i,
          index: this._columns[i].findIndex((c) => c.equals(card)),
        };
      }
    }

    return { container: "deck", column: -1, index: -1 };
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

  moveNextContainer(card: Card): boolean {
    let moved = false;
    const origin = this.getCardOrigin(card);

    if (["pile", "deck"].includes(origin.container)) return false;

    if (origin.container === "column") {
      if (origin.index !== this._columns[origin.column].length - 1) {
        return false;
      }
      moved = this.moveFromColumnToGuard(card);
      if (moved) return moved;
      moved = this.moveFromColumnToPile(card);
      if (moved) return moved;
      moved = this.moveFromColumnToColumn(card);

    }

    if (origin.container === "guard") {
      moved = this.moveFromGuardToPile(card);
      if (moved) return moved;
      moved = this.moveFromGuardToColumn(card);
    }

    return moved;
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

  moveFromGuardToColumn(card: Card): boolean {
    for (let i = 0; i < this._columns.length; i++) {
      const column = this._columns[i];
      if (
        column.length === 0 ||
        (card.compareTo(column[column.length - 1]) === -1 &&
          card.color !== column[column.length - 1].color)
      ) {
        column.push(card);
        this.removeFromGuard(card);
        return true;
      }
    }
    return false;
  }

  moveFromColumnToColumn(card: Card): boolean {
    const origin = this.getCardOrigin(card)
    const targetColumnIndex = this._columns.findIndex(
      (_, i) => i !== origin.column && 
      (this._columns[i].length === 0 ||
        (card.compareTo(this._columns[i][this._columns[i].length - 1]) === -1 &&
        card.color !== this._columns[i][this._columns[i].length - 1].color))
    );

    if (targetColumnIndex === -1) return false;

    const targetColumn = this._columns[targetColumnIndex];
    targetColumn.push(card);
    this.removeFromColumns(card);
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
