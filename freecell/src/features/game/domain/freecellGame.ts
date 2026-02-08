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

  constructor() {
    this._guards = [];
    this._piles = [];
    this._columns = [];
    this._deck = new Deck(true);

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

  move(card: Card, destination: CardLocalization): boolean {
    const origin = this.getCardLocalization(card);
    if (
      origin.container === destination.container &&
      origin.index === destination.index
    )
      return false;

    if (origin.container === "column" && destination.container === "guard") {
      const sizeColumn = this.getColumns()[origin.index].getCards().length;
      const lastCard =
        this.getColumns()[origin.index].getCards()[sizeColumn - 1];
      if (
        !this.getColumns()[origin.index].popRule() ||
        !this.getGuards()[destination.index].addRule(card) ||
        (lastCard && !card.equals(lastCard))
      )
        return false;

      const popedCard = this.getColumns()[origin.index].pop();
      if (popedCard) this.getGuards()[destination.index].add(popedCard);

      return true;
    }

    if (origin.container === "column" && destination.container === "pile") {
      if (
        !this.getColumns()[origin.index].popRule() ||
        !this.getPiles()[destination.index].addRule(card)
      )
        return false;

      const popedCard = this.getColumns()[origin.index].pop();
      if (popedCard) this.getPiles()[destination.index].add(popedCard);

      return true;
    }

    if (origin.container === "column" && destination.container === "column") {
      if (
        !this.getColumns()[origin.index].popRule() ||
        !this.getColumns()[destination.index].addRule(card)
      )
        return false;

      const popedCard = this.getColumns()[origin.index].pop();
      if (popedCard) this.getColumns()[destination.index].add(popedCard);

      return true;
    }

    if (origin.container === "guard" && destination.container === "column") {
      if (
        !this.getColumns()[destination.index].addRule(card) ||
        !this.getGuards()[origin.index].popRule()
      )
        return false;

      const popedCard = this.getGuards()[origin.index].pop();
      if (popedCard) this.getColumns()[destination.index].add(popedCard);

      return true;
    }

    if (origin.container === "guard" && destination.container === "pile") {
      if (
        !this.getPiles()[destination.index].addRule(card) ||
        !this.getGuards()[origin.index].popRule()
      )
        return false;

      const popedCard = this.getGuards()[origin.index].pop();
      if (popedCard) this.getPiles()[destination.index].add(popedCard);

      return true;
    }

    return true;
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

  getGuards() {
    return this._guards;
  }

  getPiles() {
    return this._piles;
  }

  getColumns() {
    return this._columns;
  }

  copy(): FreeCellGame {
    const copiedGame = Object.create(FreeCellGame.prototype);
    copiedGame._deck = this._deck;
    copiedGame._guards = [...this._guards];
    copiedGame._piles = [...this._piles]; //this._piles.map((pile) => [...pile]);
    copiedGame._columns = [...this._columns]; // this._columns.map((column) => [...column]);
    console.log(copiedGame);
    return copiedGame;
  }
}
