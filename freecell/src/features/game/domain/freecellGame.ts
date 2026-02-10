import { Card, Deck } from "../../cards/domain/card";
import {
  ColumnContainer,
  Container,
  GuardContainer,
  PileContainer,
  type ContainerNames,
} from "./containers";

export type CardLocalization = {
  container: ContainerNames;
  index: number;
  innerIndex: number;
};

export class FreeCellGame {
  private _guards: Container[];
  private _piles: Container[];
  private _columns: Container[];
  private _deck: Deck;
  private _moveCounter: number;
  private _autoMove: boolean;

  constructor() {
    this._guards = [];
    this._piles = [];
    this._columns = [];
    this._deck = new Deck(true);
    this._moveCounter = 0;
    this._autoMove = false;

    for (let g = 0; g < 4; g++) {
      this._guards.push(new GuardContainer());
    }

    for (let p = 0; p < 4; p++) {
      this._piles.push(new PileContainer());
    }

    for (let i = 0; i < 8; i++) {
      this._columns.push(new ColumnContainer());
      for (let j = 0; j < 7; j++) {
        if (i > 3 && j > 5) break;
        const card = this._deck.getACard();
        if (card) this._columns[i].getCards().push(card);
      }
    }
  }

  getCardLocalization(card: Card): CardLocalization {
    for (let i = 0; i < this._guards.length; i++) {
      let idx = this.getGuards()
        [i].getCards()
        .findIndex((c) => c?.equals(card));
      if (idx === -1) continue;
      return { container: "guard", index: i, innerIndex: idx };
    }

    for (let i = 0; i < this._piles.length; i++) {
      let idx = this.getPiles()
        [i].getCards()
        .findIndex((c) => c?.equals(card));
      if (idx === -1) continue;
      return { container: "pile", index: i, innerIndex: idx };
    }

    for (let i = 0; i < this._columns.length; i++) {
      let idx = this.getColumns()
        [i].getCards()
        .findIndex((c) => c?.equals(card));
      if (idx === -1) continue;
      return { container: "column", index: i, innerIndex: idx };
    }

    return { container: "", index: -1, innerIndex: -1 };
  }

  private getContainer(name: string): Container[] {
    switch (name) {
      case "guard":
        return this.getGuards();
      case "pile":
        return this.getPiles();
      case "column":
        return this.getColumns();
      default:
        return [];
    }
  }

  move(card: Card, destination: CardLocalization): boolean {
    const origin = this.getCardLocalization(card);

    if (
      origin.container === destination.container &&
      origin.index === destination.index
    )
      return false;

    if (
      !this.getContainer(origin.container)[origin.index].popRule() ||
      !this.getContainer(destination.container)[destination.index].addRule(card)
    )
      return false;

    const popedCard = this.getContainer(origin.container)[origin.index].pop();
    if (popedCard)
      this.getContainer(destination.container)[destination.index].add(
        popedCard,
      );

    this._moveCounter++;
    this.automaticMove();
    return true;
  }

  private automaticMove() {
    if (!this.getAutoMove()) return;

    let hasMoves = true;
    const lastGuardsCards: (Card | undefined)[] = this.getGuards().map(
      (guard) => guard.getCards().at(-1),
    );
    const lastColumnsCards: (Card | undefined)[] = this.getColumns().map(
      (column) => column.getCards().at(-1),
    );

    while (hasMoves) {
      hasMoves = false;
      for (const guard of lastGuardsCards) {
        if (guard) {
          for (let p = 0; p < this.getPiles().length; p++) {
            hasMoves = this.move(guard, {
              container: "pile",
              index: p,
              innerIndex: 0,
            });
          }
        }
      }
      for (const column of lastColumnsCards) {
        if (column) {
          for (let p = 0; p < this.getPiles().length; p++) {
            hasMoves = this.move(column, {
              container: "pile",
              index: p,
              innerIndex: 0,
            });
          }
        }
      }
    }
  }

  // save(): Memento {
  //   return new GameMemento(this.deepCopyState(this._state));
  // }

  // restore(memento: Memento): void {
  //   this._state = this.deepCopyState(memento.getState());

  //   this._columns = this._state.columns;
  //   this._guards = this._state.guards;
  //   this._piles = this._state.piles;

  //   console.log(
  //     `Originator: My state has changed to: ${this._state.guards.getCards()}`,
  //   );
  // }

  getAutoMove() {
    return this._autoMove;
  }

  setAutoMove(value: boolean) {
    this._autoMove = value;
  }

  getGuards() {
    return this._guards;
  }

  getPiles() {
    return this._piles;
  }

  getColumns() {
    return this._columns;
  }

  getMovesCounter() {
    return this._moveCounter;
  }

  copy(): FreeCellGame {
    const copiedGame = Object.create(FreeCellGame.prototype);
    copiedGame._deck = this._deck;
    copiedGame._guards = [...this.getGuards()];
    copiedGame._piles = [...this.getPiles()]; //this._piles.map((pile) => [...pile]);
    copiedGame._columns = [...this.getColumns()]; // this._columns.map((column) => [...column]);
    copiedGame._moveCounter = this.getMovesCounter();
    copiedGame._autoMove = this.getAutoMove();
    return copiedGame;
  }
}
