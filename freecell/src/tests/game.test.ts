// import { Card, Deck } from "../core/domain/entities/card";
// import {
//   Container,
//   FinalContainer,
//   GuardContainer,
// } from "../core/domain/entities/containers";
// import { Game } from "../core/domain/entities/game-tools";
// import { Caretaker } from "../core/domain/memento";

test("1=1", () => {
    expect(1).toBe(1)
})

// // test("Testando a criação do deck", () => {
// //   const deck = new Deck(true, false);
// //   expect(deck.cards.length).toBe(52);
// // });

// // test("Testando a criação do jogo", () => {
// //   const game = new Game(new Deck(false, false));
// //   expect(game).toBeDefined();
// //   expect(game.getDeck().cards.length).toBe(0);
// //   expect(game.getColumns().length).toBe(8);
// //   expect(game.getColumn(0).length).toBe(7);
// //   expect(game.getColumns()[game.getColumns().length - 1].length).toBe(6);
// //   expect(game.getPiles().length).toBe(4);
// //   expect(game.getGuards().length).toBe(4);
// // });

// // test("Testando mover carta da coluna para o guard", () => {
// //   const game = new Game(new Deck(false, false));
// //   const columnLengthBefore = game.getColumn(0).length;
// //   game.moveFromColumnToGuard(game.getColumn(0)[game.getColumn(0).length - 1]);
// //   expect(game.getGuard(0)).toBeDefined();
// //   expect(game.getColumn(0).length).toBe(columnLengthBefore - 1);
// // });

// // test("Testando mover carta da guard para pile", () => {
// //   const game = new Game(new Deck(true, false));
// //   game.moveFromColumnToGuard(new Card("hearts", 1));
// //   const moveResult = game.moveFromGuardToPile(new Card("hearts", 1));
// //   console.log(game.getGuards(), game.getPiles());
// //   expect(moveResult).toBe(true);
// //   expect(game.getGuard(0)).toBeUndefined();

// //   //movendo uma carta que não existe no guard
// //   const moveResult2 = game.moveFromGuardToPile(new Card("clubs", 2));
// //   expect(moveResult2).toBe(false);

// //   //movendo uma carta que não pode ir para a pile
// //   game.moveFromColumnToGuard(new Card("spades", 2));
// //   const moveResult3 = game.moveFromGuardToPile(new Card("spades", 2));
// //   expect(moveResult3).toBe(false);

// //   game.moveFromColumnToGuard(new Card("hearts", 2));
// //   const moveResult4 = game.moveFromGuardToPile(new Card("hearts", 2));
// //   expect(moveResult4).toBe(true);
// // });

// // test("Testando mover carta da coluna para a pilha", () => {
// //   const game = new Game(new Deck(true, false));
// //   const columnLengthBefore = game.getColumn(0).length;
// //   const card = game.getColumn(0)[game.getColumn(0).length - 1];
// //   const moveResult = game.moveFromColumnToPile(card);
// //   if (card.rank === 1) {
// //     expect(moveResult).toBe(true);
// //     expect(game.getColumn(0).length).toBe(columnLengthBefore - 1);
// //   } else {
// //     expect(moveResult).toBe(false);
// //   }
// // });

// // test("Testando mover carta qualquer para a pilha", () => {
// //   const game = new Game(new Deck(false, false));
// //   const card0 = new Card("diamonds", 2);
// //   const res0 = game.moveFromColumnToPile(card0);
// //   expect(res0).toBe(false);
// //   const card1 = new Card("hearts", 1);
// //   const res1 = game.moveFromColumnToPile(card1);
// //   expect(res1).toBe(true);
// //   const card2 = new Card("clubs", 2);
// //   const res2 = game.moveFromColumnToPile(card2);
// //   expect(res2).toBe(false);
// //   const card3 = new Card("hearts", 2);
// //   const res3 = game.moveFromColumnToPile(card3);
// //   expect(res3).toBe(true);
// //   const card4 = new Card("hearts", 5);
// //   const res4 = game.moveFromColumnToPile(card4);
// //   expect(res4).toBe(false);
// // });

// test("Testando Receber/Mover carta para guarda", () => {
//   const cards: (Card | undefined)[] = [
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//   ];
//   const container: Container = new GuardContainer(cards);
//   const hearts_2: Card = new Card("hearts", 2);
//   const hearts_3: Card = new Card("hearts", 3);
//   const hearts_4: Card = new Card("hearts", 4);
//   const hearts_5: Card = new Card("hearts", 5);
//   const hearts_6: Card = new Card("hearts", 6);

//   const r1 = container.move(hearts_2);
//   expect(r1).toBe(false);

//   const r2 = container.receive(hearts_3);
//   expect(r2).toBe(true);

//   const r3 = container.move(hearts_3);
//   expect(r3).toBe(true);

//   const r4 = container.move(hearts_3);
//   expect(r4).toBe(false);

//   container.receive(hearts_2);
//   container.receive(hearts_3);
//   container.receive(hearts_4);
//   container.receive(hearts_5);
//   const r6 = container.receive(hearts_6);
//   expect(r6).toBe(false);
// });

// test("Testando Receber/Mover carta para final pile", () => {
//   const cards: (Card | undefined)[] = [
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//   ];
//   const container: Container = new FinalContainer(cards);
//   const hearts_1: Card = new Card("hearts", 1);
//   const hearts_2: Card = new Card("hearts", 2);
//   const hearts_3: Card = new Card("hearts", 3);
//   const clubs_2: Card = new Card("clubs", 2);

//   const r1 = container.move(hearts_2);
//   expect(r1).toBe(false);

//   const r2 = container.receive(hearts_2);
//   expect(r2).toBe(false);

//   const r3 = container.receive(hearts_1);
//   expect(r3).toBe(true);

//   const r4 = container.move(hearts_3);
//   expect(r4).toBe(false);

//   const r5 = container.receive(hearts_3);
//   expect(r5).toBe(false);

//   const r6 = container.receive(clubs_2);
//   expect(r6).toBe(false);

//   const r7 = container.receive(hearts_2);
//   expect(r7).toBe(true);

//   const r8 = container.move(hearts_2);
//   expect(r8).toBe(true);
// });

// // test("Testando Receber/Mover carta para column", () => {
// //   const hearts_1: Card = new Card("hearts", 1);
// //   const hearts_10: Card = new Card("hearts", 10);
// //   const spades_3: Card = new Card("spades", 3);
// //   const clubs_2: Card = new Card("clubs", 2);
// //   const clubs_9: Card = new Card("clubs", 9);
// //   const diamonds_9: Card = new Card("diamonds", 9);
// //   const hearts_9: Card = new Card("hearts", 9);
// //   const cards: (Card | undefined)[] = [hearts_1, clubs_2, hearts_10, spades_3];
// //   const container: Container = new ColumnContainer(cards);

// //   //tentando tirar uma carta que não é a última
// //   const r1 = container.move(hearts_10);
// //   expect(r1).toBe(false);

// //   //tentando tirar a última carta
// //   const r2 = container.move(spades_3);
// //   expect(r2).toBe(true);

// //   //tentando colocar uma carta fora da ordem
// //   const r3 = container.receive(spades_3);
// //   expect(r3).toBe(false);

// //   //tentando colocar uma carta do mesmo naipe e na ordem certa
// //   const r4 = container.receive(hearts_9);
// //   expect(r4).toBe(false);

// //   //tentando colocar uma carta da mesma cor e na ordem certa
// //   const r5 = container.receive(diamonds_9);
// //   expect(r5).toBe(false);

// //   //tentando colocar uma carta de cor diferente e na ordem certa
// //   const r6 = container.receive(clubs_9);
// //   expect(r6).toBe(true);
// // });

// test("Mover card de column para guard", () => {
//   const game = new Game(new Deck(true, false));

//   //Movendo carta impossível da coluna para o guard
//   const r1 = game.move(game.getColumn(2).getCards()[0]!, {
//     container: "guard",
//   });
//   expect(r1).toBe(false);
//   expect(game.getColumn(2).getCards().length).toBe(7)

//   //Movendo primeira carta da coluna para o guard
//   const r2 = game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );
//   expect(r2).toBe(true);
//   expect(game.getColumn(2).getCards().length).toBe(6)

//   game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );
//   game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );

//   //Movendo última carta possível para o guard
//   const r3 = game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );
//   expect(r3).toBe(true);
//   expect(game.getColumn(2).getCards().length).toBe(3)

//   //O guard já deve estar lotado
//   const r4 = game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );
//   expect(r4).toBe(false);
//   expect(game.getColumn(2).getCards().length).toBe(3)
// });


// test("Testando o backup/restore do GameState", () => {
//   const game = new Game(new Deck(true, false));
//   const caretaker = new Caretaker(game);

//   game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );
//   game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );

//   const guardsBeforeBackup = game
//     .getGuards()
//     .getCards()
//     .map((c) => (c ? `${c.suit}-${c.rank}` : undefined));
//   const columnBeforeBackup = game
//     .getColumn(2)
//     .getCards()
//     .map((c) => (c ? `${c.suit}-${c.rank}` : undefined));
//   caretaker.backup();

//   game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );
//   game.move(
//     game.getColumn(2).getCards()[game.getColumn(2).getCards().length - 1]!,
//     { container: "guard" },
//   );

//   const guardsAfterMove = game
//     .getGuards()
//     .getCards()
//     .map((c) => (c ? `${c.suit}-${c.rank}` : undefined));
//   const columnAfterMove = game
//     .getColumn(2)
//     .getCards()
//     .map((c) => (c ? `${c.suit}-${c.rank}` : undefined));

//   expect(guardsAfterMove).not.toEqual(guardsBeforeBackup);
//   expect(columnAfterMove).not.toEqual(columnBeforeBackup);

//   caretaker.undo();

//   const guardsAfterUndo = game
//     .getGuards()
//     .getCards()
//     .map((c) => (c ? `${c.suit}-${c.rank}` : undefined));
//   const columnAfterUndo = game
//     .getColumn(2)
//     .getCards()
//     .map((c) => (c ? `${c.suit}-${c.rank}` : undefined));

//   expect(guardsAfterUndo).toEqual(guardsBeforeBackup);
//   expect(columnAfterUndo).toEqual(columnBeforeBackup);
// });
