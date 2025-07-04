import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";

export default function CardDeck({ deck }) {
  /* STATES */
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [gameId, setGameId] = useState(0);
  const [revealedCards, setRevealedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  /* SIDE EFFECTS */
  // If two cards are revealed, hide all cards
  useEffect(() => {
    console.log("Side effect Revealed cards: ", revealedCards);
    if (revealedCards.length === 2) {
      if (revealedCards[0] === revealedCards[1]) {
        setMatchedPairs([...matchedPairs, revealedCards[0]]);
      }
      let updatedDeck = hideCards(shuffledDeck, matchedPairs);
      console.log("Side effect Updating deck: ", updatedDeck);
      setShuffledDeck(updatedDeck);
      setRevealedCards([]);
    }
  }, [revealedCards, shuffledDeck, matchedPairs]);

  // Side effect: Build a new deck for each new game
  useEffect(() => {
    const randomizedDeck = randomizeDeck(createPairsAndAssignUniqueIds(deck));
    setShuffledDeck(randomizedDeck);
  }, [gameId, deck]);

  /* FUNCTIONS */
  // Reveals a card, when it is clicked
  const handleClick = (e) => {
    const targetCardId = e.target.dataset.id;

    // Set isVisible = true when the card id matches the id of a card in the card deck array
    let updatedDeck = shuffledDeck.map((card) => {
      if (card.id === targetCardId) {
        setRevealedCards((prev) => [...prev, card.pairId]);
        console.log("setting Revealed cards: ", revealedCards);

        return {
          ...card,
          isVisible: true,
        };
      }

      return { ...card };
    });

    setShuffledDeck(updatedDeck);
    console.log("handleCLick Updating deck: ", updatedDeck);
  };

  // Hides all cards in the deck, except the ones that are pairs and have been revealed
  const hideCards = (cardDeck, matchedPairs) => {
    return cardDeck.map((card) => {
      if (matchedPairs.includes(card.pairId)) {
        return { ...card, isVisible: true };
      }
      return { ...card, isVisible: false };
    });
  };

  // Creates 2 cards for each card in the original deck array
  // Assigns a unique ID to each card, that can be used as key later on
  const createPairsAndAssignUniqueIds = (cardDeck) => {
    console.log("Old deck: ", cardDeck);
    return cardDeck.flatMap((card) => [
      {
        id: uuidv4(),
        pairId: card.pairId,
        image: card.image,
        isVisible: card.isVisible,
      },
      {
        id: uuidv4(),
        pairId: card.pairId,
        image: card.image,
        isVisible: card.isVisible,
      },
    ]);
  };

  // Randomizes the card deck
  const randomizeDeck = (cardDeck) => {
    return cardDeck
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  return (
    <div className="deck">
      {shuffledDeck.map((card) => {
        return (
          <Card
            key={card.id}
            id={card.id}
            pairId={card.pairId}
            image={card.image}
            isVisible={card.isVisible}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
}
