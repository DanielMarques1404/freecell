import { Card, Deck } from "./card";
import {
  ColumnContainer,
  FinalContainer,
  GuardContainer,
  type Container,
} from "./containers";

type CardOrigin = {
  container: "deck" | "guard" | "pile" | "column";
  column: number;
  index: number;
};

export class Game {
  private _guards: Container = new GuardContainer([]);
  private _piles: Container[] = [
    new FinalContainer([]),
    new FinalContainer([]),
    new FinalContainer([]),
    new FinalContainer([]),
  ];
  private _columns: Container[] = [
    new ColumnContainer([]),
    new ColumnContainer([]),
    new ColumnContainer([]),
    new ColumnContainer([]),
    new ColumnContainer([]),
    new ColumnContainer([]),
    new ColumnContainer([]),
    new ColumnContainer([]),
  ];
  private _deck: Deck;

  constructor(deck: Deck) {
    this._deck = deck;
    this.resetGame();
  }

  private resetGame() {
    let cards: Card[] = [];
    for (let i = 0; i < 8; i++) {
      cards = [];
      for (let j = 0; j < 7; j++) {
        if (i > 3 && j > 5) break;
        const card = this._deck.getACard();
        if (card) cards.push(card);
      }
      this._columns[i] = new ColumnContainer(cards);
    }
  }

  private getCardOrigin(card: Card): CardOrigin {
    if (this._guards.hasThisCard(card)) {
      return {
        container: "guard",
        column: -1,
        index: this._guards.getCards().findIndex((g) => g?.equals(card)),
      };
    }

    for (let i = 0; i < this._piles.length; i++) {
      if (this._piles[i].hasThisCard(card)) {
        return {
          container: "pile",
          column: i,
          index: this._piles[i].getCards().findIndex((c) => c!.equals(card)),
        };
      }
    }

    for (let i = 0; i < this._columns.length; i++) {
      if (this._columns[i].hasThisCard(card)) {
        return {
          container: "column",
          column: i,
          index: this._columns[i].getCards().findIndex((c) => c!.equals(card)),
        };
      }
    }

    return { container: "deck", column: -1, index: -1 };
  }

  move(card: Card) {
    console.log(this.getCardOrigin(card))
  }

  getColumns(): Container[] {
    return this._columns;
  }

  getPiles(): Container[] {
    return this._piles;
  }

  getGuards(): Container {
    return this._guards;
  }

  getColumn(index: number): Container {
    return this._columns[index];
  }

  getPile(index: number): Container {
    return this._piles[index];
  }

  getGuard(index: number): Card | undefined {
    return this._guards.getCards()[index];
  }

  getDeck(): Deck {
    return this._deck;
  }

  copy(): Game {
    const copiedGame = Object.create(Game.prototype);
    copiedGame._deck = this._deck;
    copiedGame._guards = new GuardContainer(this._guards.getCards());
    copiedGame._piles = this._piles.map(
      (pile) => new FinalContainer([...pile.getCards()]),
    );
    copiedGame._columns = this._columns.map(
      (column) => new ColumnContainer([...column.getCards()]),
    );
    return copiedGame;
  }
}
