import { Card } from "../core/domain/entities/card";
import {
  ColumnContainer,
  GuardContainer,
  PileContainer,
} from "../features/game/domain/containers";
import { FreeCellGame } from "../features/game/domain/freecellGame";

test("Manegando cartas no guard container", () => {
  const gc = new GuardContainer();
  const card1: Card = new Card("clubs", 2);
  const card2: Card = new Card("clubs", 4);

  expect(gc.getCards().length).toBe(0);
  const r1 = gc.add(card1);
  expect(r1).toBe(true);
  expect(gc.getCards().length).toBe(1);

  const r2 = gc.add(card2);
  expect(r2).toBe(false);
  expect(gc.getCards().length).toBe(1);
  const popedCard = gc.pop();
  expect(popedCard).toBeDefined();
  expect(card1.equals(popedCard!)).toBe(true);
});

test("Manegando cartas no pile container", () => {
  const pile = new PileContainer();
  const card0: Card = new Card("clubs", 1);
  const card1: Card = new Card("clubs", 2);
  const card2: Card = new Card("clubs", 4);
  const card3: Card = new Card("hearts", 3);
  const card4: Card = new Card("spades", 8);

  expect(pile.getCards().length).toBe(0);

  const r1 = pile.add(card1);
  expect(r1).toBe(false);
  expect(pile.getCards().length).toBe(0);

  const r2 = pile.add(card0);
  expect(r2).toBe(true);
  expect(pile.getCards().length).toBe(1);

  const r3 = pile.add(card2);
  expect(r3).toBe(false);
  expect(pile.getCards().length).toBe(1);

  const r4 = pile.add(card1);
  expect(r4).toBe(true);
  expect(pile.getCards().length).toBe(2);

  const r5 = pile.add(card3);
  expect(r5).toBe(false);
  expect(pile.getCards().length).toBe(2);

  const r6 = pile.add(card4);
  expect(r6).toBe(false);
  expect(pile.getCards().length).toBe(2);

  // const popedCard = pile.pop();
  // expect(popedCard).toBeUndefined();
});

test("Manegando cartas no column container", () => {
  const column = new ColumnContainer();
  const card1: Card = new Card("clubs", 8);
  const card2: Card = new Card("hearts", 7);
  const card3: Card = new Card("spades", 7);
  const card4: Card = new Card("spades", 6);

  expect(column.getCards().length).toBe(0);

  //incluindo carta na lista vazia
  const r1 = column.add(card1);
  expect(r1).toBe(true);
  expect(column.getCards().length).toBe(1);

  //sequencia correta mas mesma cor
  const r2 = column.add(card3);
  expect(r2).toBe(false);
  expect(column.getCards().length).toBe(1);

  //sequencia correta cor diferente
  const r3 = column.add(card2);
  expect(r3).toBe(true);
  expect(column.getCards().length).toBe(2);

  //sequencia errada mas cor diferente
  const r4 = column.add(card3);
  expect(r4).toBe(false);
  expect(column.getCards().length).toBe(2);

  //outro sequencia correta cor diferente
  const r5 = column.add(card4);
  expect(r5).toBe(true);
  expect(column.getCards().length).toBe(3);

  //testando pop da última carta inserida
  const r6 = column.pop();
  expect(r6).toBeDefined();
  expect(card4.equals(r6!)).toBe(true);
  expect(column.getCards().length).toBe(2);

  //pop em lista vazia
  column.pop();
  column.pop();
  expect(column.getCards().length).toBe(0);

  const r7 = column.pop();
  expect(r7).toBeUndefined();
});

test("Testando estado inicial do FreeCellGame", () => {
  const game = new FreeCellGame();
  expect(game.getGuards().length).toBe(4);
  expect(game.getPiles().length).toBe(4);
  expect(game.getColumns().length).toBe(8);

  const gCards = game
    .getGuards()
    .every((guard) => guard.getCards().length === 0);
  const pCards = game.getPiles().every((pile) => pile.getCards().length === 0);
  expect(gCards).toBe(true);
  expect(pCards).toBe(true);

  for (let i = 0; i < 4; i++) {
    let cCards = game.getColumns()[i].getCards().length;
    expect(cCards).toBe(7);
  }
  for (let i = 4; i < 7; i++) {
    let cCards = game.getColumns()[i].getCards().length;
    expect(cCards).toBe(6);
  }
});

test("Localizando a posição de uma carta", () => {
  const game = new FreeCellGame()
  const card = new Card("diamonds", 2)
  const localization = game.getCardLocalization(card)

  expect(localization.container === "guard").toBe(false)
  expect(localization.container === "pile").toBe(false)
  expect(localization.container === "column").toBe(true)
})

test("Movendo uma carta", () => {
  const game = new FreeCellGame()
  const card = game.getColumns()[0].getCards()[6]
  const r1 = game.move(card!, {container: "guard", index: 0, innerIndex: 0})
  expect(r1).toBe(true)

  // const r1 = game.getColumns()[0].pop()
  // expect(game.getColumns()[0].getCards().length).toBe(6)
  // expect(game.getGuards()[0].getCards().length).toBe(0)
  // const r2 = game.getGuards()[0].add(r1!)
  // expect(r2).toBe(true)
  // expect(game.getGuards()[0].getCards().length).toBe(1)

  expect(game.getColumns()[0].getCards().length).toBe(6)
  expect(game.getGuards()[0].getCards()[0]?.equals(card!)).toBe(true)
})