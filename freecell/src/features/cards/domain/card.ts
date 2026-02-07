export class Card {
  public suit: "hearts" | "diamonds" | "clubs" | "spades";
  public rank: number;
  public folded: boolean;
  public color: "red" | "black";

  constructor(
    suit: "hearts" | "diamonds" | "clubs" | "spades",
    rank: number,
    folded: boolean = false,
  ) {
    this.suit = suit;
    this.rank = rank;
    this.folded = folded;
    if (suit === "hearts" || suit === "diamonds") {
      this.color = "red";
    } else {
      this.color = "black";
    }
  }

  public compareTo(other: Card): number {
    if (this.rank !== other.rank) {
      return this.rank - other.rank;
    }
    return 0;
  }

  public equals(other: Card): boolean {
    return this.suit === other?.suit && this.rank === other?.rank;
  }

  public toString(): string {
    return `${this.suit}-[${this.rank}]`
  }

  public getImagePath(): string {
    if (this.folded) {
      return "./cards/card_back_red.png";
    }

    const rankNames: { [key: number]: string } = {
      1: "ace",
      11: "jack",
      12: "queen",
      13: "king",
    };
    const rankStr = rankNames[this.rank] || this.rank.toString();
    return `./cards/${rankStr}_of_${this.suit}.png`;
  }
}

export class Deck {
  public cards: Card[] = [];

  constructor(shuffle: boolean = true, folded: boolean = false) {
    const suits: ("hearts" | "diamonds" | "clubs" | "spades")[] = [
      "hearts",
      "diamonds",
      "clubs",
      "spades",
    ];
    for (const suit of suits) {
      for (let rank = 1; rank <= 13; rank++) {
        this.cards.push(new Card(suit, rank, folded));
      }
    }
    if (shuffle) this.shuffle();
  }

  public shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public getACard(): Card | null {
    return this.cards.pop() || null;
  }
}
