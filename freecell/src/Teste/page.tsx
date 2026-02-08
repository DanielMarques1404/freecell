import { ColumnContainer } from "../features/cards/components/ColumnContainer";
import { GuardContainer } from "../features/cards/components/GuardContainer";
import { InfoPanel } from "../features/cards/components/InfoPanel";
import { PileContainer } from "../features/cards/components/PileContainer";

const Teste = () => {
  //   const { game, setGame } = useGame();

  //   const handleDragStartFromColumn = (
  //     event: React.DragEvent<HTMLLIElement>,
  //     card?: Card,
  //   ) => {
  //     if (!card) return;

  //     console.log("Dragging: ", card);
  //     event.dataTransfer.effectAllowed = "move";

  //     // melhor serializar de forma explícita
  //     event.dataTransfer.setData("text/plain", card.toString());
  //     event.dataTransfer.setData(
  //       "card",
  //       JSON.stringify({ suit: card.suit, rank: card.rank }),
  //     );
  //   };

  //   const handleDragStartFromGuard = (
  //     event: React.DragEvent<HTMLLIElement>,
  //     index: number,
  //   ) => {
  //     const card = game.getGuards()[index].getCards()[0];
  //     if (!card) return;

  //     event.dataTransfer.effectAllowed = "move";
  //     event.dataTransfer.setData("text/plain", `${index}`);
  //     event.dataTransfer.setData(
  //       "card",
  //       JSON.stringify({ suit: card.suit, rank: card.rank }),
  //     );
  //   };

  //   const handleDragOverTarget = (event: React.DragEvent<HTMLLIElement>) => {
  //     event.preventDefault();
  //   };

  //   const SUITS = ["hearts", "diamonds", "clubs", "spades"] as const;
  //   type Suit = (typeof SUITS)[number];

  //   function isSuit(x: string): x is Suit {
  //     return (SUITS as readonly string[]).includes(x);
  //   }

  //   const handleDragDropGuard = (
  //     event: React.DragEvent<HTMLLIElement>,
  //     index: number,
  //   ) => {
  //     event.preventDefault();
  //     const data = JSON.parse(event.dataTransfer.getData("card")) as {
  //       suit: string;
  //       rank: number;
  //     };

  //     if (isSuit(data.suit) && Number.isFinite(data.rank)) {
  //       const card = new Card(data.suit, data.rank);
  //       game.move(card, { container: "guard", index: index, innerIndex: 0 });
  //       setGame(game.copy());
  //     }
  //   };

  //   const handleDragDropColumn = (
  //     event: React.DragEvent<HTMLUListElement>,
  //     index: number,
  //   ) => {
  //     event.preventDefault();
  //     const data = JSON.parse(event.dataTransfer.getData("card")) as {
  //       suit: string;
  //       rank: number;
  //     };

  //     if (isSuit(data.suit) && Number.isFinite(data.rank)) {
  //       const card = new Card(data.suit, data.rank);
  //       game.move(card, { container: "column", index: index, innerIndex: 0 });
  //       setGame(game.copy());
  //     }
  //   };

  return (
    <div className="flex flex-col p-4 gap-4 h-screen bg-green-700">
      <InfoPanel />
      <div className="flex justify-between">
        <GuardContainer color={"dark"} />
        <PileContainer color={"light"} />
      </div>
      <div className="flex-1 w-full">
        <ColumnContainer color={""} />
      </div>
    </div>
  );
};

export default Teste;
