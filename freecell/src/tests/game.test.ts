import { Card, Deck } from "../core/domain/entities/card";
import { Game } from "../core/domain/entities/game";

test("Testando a criação do deck", () => {
  const deck = new Deck(true, false);
  expect(deck.cards.length).toBe(52);
});

test("Testando a criação do jogo", () => {
  const game = new Game(new Deck(false, false));
  expect(game).toBeDefined();
  expect(game.getDeck().cards.length).toBe(0);
  expect(game.getColumns().length).toBe(8);
  expect(game.getColumn(0).length).toBe(7);
  expect(game.getColumns()[game.getColumns().length - 1].length).toBe(6);
  expect(game.getPiles().length).toBe(4);
  expect(game.getGuards().length).toBe(4);
});

test("Testando mover carta da coluna para o guard", () => {
  const game = new Game(new Deck(false, false));
  const columnLengthBefore = game.getColumn(0).length;
  game.moveFromColumnToGuard(game.getColumn(0)[game.getColumn(0).length - 1]);
  expect(game.getGuard(0)).toBeDefined();
  expect(game.getColumn(0).length).toBe(columnLengthBefore - 1);
});

test("Testando mover carta da guard para pile", () => {
  const game = new Game(new Deck(true, false));
  game.moveFromColumnToGuard(new Card("hearts", 1));
  const moveResult = game.moveFromGuardToPile(new Card("hearts", 1));
  console.log(game.getGuards(), game.getPiles());
  expect(moveResult).toBe(true);
  expect(game.getGuard(0)).toBeUndefined();

  //movendo uma carta que não existe no guard
  const moveResult2 = game.moveFromGuardToPile(new Card("clubs", 2));
  expect(moveResult2).toBe(false);

  //movendo uma carta que não pode ir para a pile
  game.moveFromColumnToGuard(new Card("spades", 2));
  const moveResult3 = game.moveFromGuardToPile(new Card("spades", 2));
  expect(moveResult3).toBe(false);

  game.moveFromColumnToGuard(new Card("hearts", 2));
  const moveResult4 = game.moveFromGuardToPile(new Card("hearts", 2));
  expect(moveResult4).toBe(true);
});

test("Testando mover carta da coluna para a pilha", () => {
  const game = new Game(new Deck(true, false));
  const columnLengthBefore = game.getColumn(0).length;
  const card = game.getColumn(0)[game.getColumn(0).length - 1];
  const moveResult = game.moveFromColumnToPile(card);
  if (card.rank === 1) {
    expect(moveResult).toBe(true);
    expect(game.getColumn(0).length).toBe(columnLengthBefore - 1);
  } else {
    expect(moveResult).toBe(false);
  }
});

test("Testando mover carta qualquer para a pilha", () => {
  const game = new Game(new Deck(false, false));
  const card0 = new Card("diamonds", 2);
  const res0 = game.moveFromColumnToPile(card0);
  expect(res0).toBe(false);
  const card1 = new Card("hearts", 1);
  const res1 = game.moveFromColumnToPile(card1);
  expect(res1).toBe(true);
  const card2 = new Card("clubs", 2);
  const res2 = game.moveFromColumnToPile(card2);
  expect(res2).toBe(false);
  const card3 = new Card("hearts", 2);
  const res3 = game.moveFromColumnToPile(card3);
  expect(res3).toBe(true);
  const card4 = new Card("hearts", 5);
  const res4 = game.moveFromColumnToPile(card4);
  expect(res4).toBe(false);
});
