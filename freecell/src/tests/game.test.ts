import { Card, Deck } from "../core/domain/entities/card";
import { Game } from "../core/domain/entities/game";

test("Testando a criação do deck", async () => {
    const deck = new Deck(true, false);
    expect(deck.cards.length).toBe(52);
})

test("Testando a criação do jogo", async () => {
    const game = new Game(new Deck(false, false));
    game.resetGame();
    expect(game).toBeDefined();
    expect(game._deck.cards.length).toBe(0);
    expect(game._columns.length).toBe(8);
    expect(game._columns[0].length).toBe(7)
    expect(game._columns[game._columns.length-1].length).toBe(6)
    expect(game._piles.length).toBe(4);
    expect(game._guards.length).toBe(4);
})

test("Testando mover carta da coluna para o guard", async () => {
    const game = new Game(new Deck(false, false));
    game.resetGame();
    game.moveFromColumnToGuard(game._columns[0][game._columns[0].length-1], 0);
    expect(game._guards[0]).toBeDefined();
    expect(game._columns[0].length).toBe(6);
})

test("Testando mover carta da coluna para a pilha", async () => {
    const game = new Game(new Deck(false, false));
    game.resetGame();
    game.moveFromColumnToPile(game._columns[0][game._columns[0].length-1], 0);
    expect(game._piles[0]).toBeDefined();
    expect(game._columns[0].length).toBe(6);
})

test("Testando mover carta qualquer para a pilha", async () => {
    const game = new Game(new Deck(false, false));
    const card1 = new Card("hearts", 1);
    const res1 = game.moveFromColumnToPile(card1, 0);
    expect(res1).toBe(true);
    const card2 = new Card("clubs", 2);
    const res2 = game.moveFromColumnToPile(card2, 0);
    expect(res2).toBe(false);
    const card3 = new Card("hearts", 2);
    const res3 = game.moveFromColumnToPile(card3, 0);
    expect(res3).toBe(true);
    const card4 = new Card("hearts", 5);
    console.log(card4, game._piles[0])
    const res4 = game.moveFromColumnToPile(card4, 0);
    expect(res4).toBe(false);
})

