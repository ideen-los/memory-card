import CardDeck from "./CardDeck";

export default function GameSetup() {
  const deck = [
    { id: "", pairId: "1", image: "1", isVisible: false },
    { id: "", pairId: "2", image: "2", isVisible: false },
    { id: "", pairId: "3", image: "3", isVisible: false },
    { id: "", pairId: "4", image: "4", isVisible: false },
    { id: "", pairId: "5", image: "5", isVisible: false },
    { id: "", pairId: "6", image: "6", isVisible: false },
  ];

  return <CardDeck deck={deck} />;
}
