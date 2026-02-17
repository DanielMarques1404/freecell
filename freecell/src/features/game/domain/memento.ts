import type { FreeCellGame, GameState } from "./freecellGame";

export interface Memento {
  getState(): GameState;
  getDate(): string;
}

export class GameMemento implements Memento {
  private _state: GameState;
  private _date: string;

  constructor(state: GameState) {
    this._state = {
      columns: state.columns.map((c) => c.clone()),
      guards: state.guards.map((g) => g.clone()),
      piles: state.piles.map((p) => p.clone()),
    };
    this._date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  getState(): GameState {
    return {
      columns: this._state.columns.map((c) => c.clone()),
      guards: this._state.guards.map((g) => g.clone()),
      piles: this._state.piles.map((p) => p.clone()),
    };
  }

  getDate(): string {
    return this._date;
  }
}

export class Caretaker {
  private mementos: Memento[] = [];
  private originator: FreeCellGame;

  constructor(originator: FreeCellGame) {
    this.originator = originator;
  }

  backup(): void {
    const mm = this.originator.save();
    this.mementos.push(mm);
  }

  undo(): void {
    if (!this.mementos.length) return;
    const memento = this.mementos.pop();
    if (memento) this.originator.restore(memento);
  }

  showHistory(): void {
    console.log("Caretaker: Here's the list of mementos:");
    for (const memento of this.mementos) {
      console.log(memento.getDate());
    }
  }

  getMementos(): Memento[] {
    return this.mementos;
  }
}
