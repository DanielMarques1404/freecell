import type { Card } from "./card";

export abstract class Container {
  protected _cards: (Card | undefined)[];

  constructor(cards: (Card | undefined)[]) {
    this._cards = cards;
  }

  abstract move(card: Card): boolean;
  abstract receive(card: Card, index?: number): boolean;

  getCards(): (Card | undefined)[] {
    return this._cards;
  }

  hasThisCard(card: Card): number {
    return this._cards.indexOf(card);
  }
}

export class GuardContainer extends Container {
  move(card: Card): boolean {
    const index = this.getCards().indexOf(card);
    if (index === -1) return false;

    this._cards[index] = undefined;
    return true;
  }

  receive(card: Card, index?: number): boolean {
    if (index && this._cards[index] === undefined) {
      this._cards[index] = card;
      return true;
    }

    const newIndex = this._cards.findIndex((c) => c === undefined);
    if (newIndex === -1) return false;
    this._cards[newIndex] = card;
    return true;
  }
}

export abstract class PileContainer extends Container {
  move(card: Card): boolean {
    const lastCard = this._cards[this._cards.length - 1];
    if (lastCard && card.equals(lastCard)) {
      this._cards.pop();
      return true;
    }
    return false;
  }

  receive(card: Card): boolean {
    const lastCard = this._cards[this._cards.length - 1];
    if (
      lastCard &&
      (!this.getCardSuitRule(lastCard.suit, card.suit) ||
        !this.getCardColorRule(lastCard.color, card.color) ||
        !this.getCompareRule(lastCard, card))
    )
      return false;
    if (!lastCard && card.rank != 1) return false;
    this._cards.push(card);
    return true;
  }

  abstract getCompareRule(lastCard: Card, newCard: Card): boolean;
  abstract getCardSuitRule(lastCardSuit: string, newCardSuit: string): boolean;
  abstract getCardColorRule(
    lastCardColor: string,
    newCardColor: string,
  ): boolean;
}

export class ColumnContainer extends PileContainer {
  getCompareRule(lastCard: Card, newCard: Card): boolean {
    return newCard.compareTo(lastCard) === -1;
  }

  getCardColorRule(lastCardColor: string, newCardColor: string): boolean {
    return lastCardColor !== newCardColor;
  }

  getCardSuitRule(lastCardSuit: string, newCardSuit: string): boolean {
    return lastCardSuit !== newCardSuit;
  }
}

export class FinalContainer extends PileContainer {
  getCompareRule(lastCard: Card, newCard: Card): boolean {
    return newCard.compareTo(lastCard) === 1;
  }

  getCardColorRule(lastCardColor: string, newCardColor: string): boolean {
    return lastCardColor === newCardColor;
  }

  getCardSuitRule(lastCardSuit: string, newCardSuit: string): boolean {
    return lastCardSuit === newCardSuit;
  }
}
