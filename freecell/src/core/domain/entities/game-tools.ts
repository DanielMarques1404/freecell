import { GameMemento, type Memento } from "../memento";
import { Card, Deck } from "./card";
import {
  ColumnContainer,
  FinalContainer,
  GuardContainer,
  type Container,
} from "./containers";

export type CardLocation = {
  container: "deck" | "guard" | "pile" | "column";
  column?: number;
  index?: number;
};

export interface GameState {
  name: string;
  guards: Container;
  piles: Container[];
  columns: Container[];
}

export class Game {
  readonly INITIAL_GUARDS: Container = new GuardContainer([
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  readonly INITIAL_PILES: Container[] = [
    new FinalContainer([]),
    new FinalContainer([]),
    new FinalContainer([]),
    new FinalContainer([]),
  ];

  readonly INITIAL_COLUMNS: Container[] = [
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
  private _columns: Container[];
  private _piles: Container[];
  private _guards: Container;
  private _state: GameState;
  readonly INITIAL_STATE: GameState = {
    name: "Initial State",
    columns: this.INITIAL_COLUMNS,
    guards: this.INITIAL_GUARDS,
    piles: this.INITIAL_PILES,
  };

  constructor(deck: Deck) {
    this._deck = deck;
    this._columns = this.INITIAL_COLUMNS;
    this._piles = this.INITIAL_PILES;
    this._guards = this.INITIAL_GUARDS;
    this._state = this.INITIAL_STATE;
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
    this._guards = this.INITIAL_GUARDS;
    this._piles = this.INITIAL_PILES;
    this._state = { ...this.INITIAL_STATE, columns: this._columns };
  }

  private deepCopyState(state: GameState): GameState {
    return {
      name: state.name,
      guards: new GuardContainer([...state.guards.getCards()]),
      piles: state.piles.map(
        (pile) => new FinalContainer([...pile.getCards()]),
      ),
      columns: state.columns.map(
        (column) => new ColumnContainer([...column.getCards()]),
      ),
    };
  }

  save(): Memento {
    return new GameMemento(this.deepCopyState(this._state));
  }

  restore(memento: Memento): void {
    this._state = this.deepCopyState(memento.getState());

    this._columns = this._state.columns;
    this._guards = this._state.guards;
    this._piles = this._state.piles;

    console.log(
      `Originator: My state has changed to: ${this._state.guards.getCards()}`,
    );
  }

  private getCardOrigin(card: Card): CardLocation {
    if (this._guards.hasThisCard(card) > -1) {
      return {
        container: "guard",
        column: -1,
        index: this._guards.getCards().findIndex((g) => g?.equals(card)),
      };
    }

    for (let i = 0; i < this._piles.length; i++) {
      if (this._piles[i].hasThisCard(card) > -1) {
        return {
          container: "pile",
          column: i,
          index: this._piles[i].getCards().findIndex((c) => c!.equals(card)),
        };
      }
    }

    for (let i = 0; i < this._columns.length; i++) {
      if (this._columns[i].hasThisCard(card) > -1) {
        return {
          container: "column",
          column: i,
          index: this._columns[i].getCards().findIndex((c) => c!.equals(card)),
        };
      }
    }

    return { container: "deck", column: -1, index: -1 };
  }

  move(card: Card, destiny: CardLocation): boolean {
    let success = false;
    const origin = this.getCardOrigin(card);
    if (origin === destiny) return false;

    //from column to guard
    if (origin.container === "column" && destiny.container === "guard") {
      if (
        !this.getColumns()[origin.column!].move(card) ||
        !this.getGuards().receive(card)
      ) {
        return false;
      } else success = true;
    } else if (origin.container === "column" && destiny.container === "pile") {
      if (!this.getColumns()[origin.column!].move(card)) {
        return false;
      }

      success = this.tryAddInPile(card);
    } else if (origin.container === "guard" && destiny.container === "pile") {
      if (!this.getGuards().move(card)) {
        return false;
      }

      success = this.tryAddInPile(card);
    }

    if (success) {
      this._state = {
        name: `card: ${card.rank}-${card.suit} | from: column | to: guard`,
        columns: this._columns,
        guards: this._guards,
        piles: this._piles,
      };
    }

    return success;
  }

  private tryAddInPile(card: Card) {
    for (let p = 0; p < 4; p++) {
      if (this.getPile(p).receive(card)) {
        return true;
      }
    }
    return false;
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

  getState(): GameState {
    return this._state;
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
