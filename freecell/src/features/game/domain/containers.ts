import { Card } from "../../cards/domain/card";

export type ContainerNames = "" | "guard" | "pile" | "column";

export abstract class Container {
  private _name: ContainerNames;
  private _cards: (Card | undefined)[];
  private _maxLenght: number;

  constructor(
    name: ContainerNames,
    cards: (Card | undefined)[],
    maxLenght: number,
  ) {
    this._name = name;
    this._cards = cards;
    this._maxLenght = maxLenght;
  }

  add(card: Card): boolean {
    if (!this.addRule(card)) return false;
    this.getCards().push(card);
    return true;
  }

  pop(): Card | undefined {
    if (!this.popRule()) return undefined;
    return this.getCards()?.pop();
  }

  abstract addRule(card: Card): boolean;
  abstract popRule(): boolean;

  getName() {
    return this._name;
  }
  getCards() {
    return this._cards;
  }
  getMaxLenght() {
    return this._maxLenght;
  }

  toString() {
    let c = this.getCards().map(c => c?.toString())
    return c.join('|')
  }

  clone(): Container {
    const cloned = new (this.constructor as { new (): Container })();

    for (const c of this.getCards()) {
      cloned.getCards().push(c ? c.clone() : undefined);
    }

    return cloned;
  }  
}

export class GuardContainer extends Container {
  constructor() {
    const initialCards: (Card | undefined)[] = [];
    super("guard", initialCards, 1);
  }

  public addRule(_card: Card): boolean {
    if (this.getCards().length >= this.getMaxLenght()) return false;
    return true;
  }

  public popRule(): boolean {
    if (this.getCards().length === 1) return true;
    return false;
  }
}

export class PileContainer extends Container {
  constructor() {
    const initialCards: (Card | undefined)[] = [];
    super("pile", initialCards, 13);
  }

  public addRule(card: Card): boolean {
    if (this.getCards().length === 0 && card.rank === 1) return true;
    if (this.getCards().length === 0) return false;
    if (this.getCards().length >= this.getMaxLenght()) return false;

    const topCard = this.getCards()[this.getCards().length - 1];

    if (topCard!.suit !== card.suit || card.compareTo(topCard!) !== 1)
      return false;
    return true;
  }

  public popRule(): boolean {
    return true;
  }
}

export class ColumnContainer extends Container {
  constructor() {
    const initialCards: (Card | undefined)[] = [];
    super("column", initialCards, 52);
  }

  public addRule(card: Card): boolean {
    if (this.getCards().length === 0) return true;
    if (this.getCards().length >= this.getMaxLenght()) return false;

    const topCard = this.getCards()[this.getCards().length - 1];

    if (topCard!.color === card.color || card.compareTo(topCard!) !== -1)
      return false;

    return true;
  }

  public popRule(): boolean {
    if (this.getCards().length === 0) return false;
    return true;
  }
}
