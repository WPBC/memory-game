import './App.css';
import {useEffect, useState} from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
    { "src": "/img/helmet-1.png", matched: false },
    { "src": "/img/potion-1.png", matched: false },
    { "src": "/img/ring-1.png", matched: false },
    { "src": "/img/scroll-1.png", matched: false },
    { "src": "/img/shield-1.png", matched: false },
    { "src": "/img/sword-1.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle Cards
  const shuffleCards = () => {

    // Reset choices in case 1 choice was made before start a new game.
    setChoiceOne(null);
    setChoiceTwo(null);

    // Shuffle the cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    // Set the shuffle cards to state
    setCards(shuffledCards);

    // Reset turns
    setTurns(0);
  }

  // Handle a choice
  const handleChoice = (card) => {

    // If there is no choice yet, set the first choice, else set the second choice
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Reset Choices and add a turn
  const resetTurn = () => {
    // Reset choices
    setChoiceOne(null);
    setChoiceTwo(null);

    // Add a turn
    setTurns(prevTurns => prevTurns + 1);

    // Disable choices
    setDisabled(false);
  }

  // Compare selected cards & check if they match
  useEffect(() => {

    // Have 2 choices been selected
    if (choiceOne && choiceTwo) {

      // Disable all the cards whilst checking for a match
      setDisabled(true);

      // Check if the cards are a match
      if (choiceOne.src === choiceTwo.src) {

        // Set the cards to matched
        setCards(prevCards => {
          return prevCards.map(card => card.src === choiceOne.src ? {...card, matched: true} : card );
        });

        // Reset the choices, disable and add turns
        resetTurn();
      } else {

        // Set delay for cards to flip back over
        setTimeout(() => {

          // Reset the choices, disable and add turns
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]); // Only run if choiceOne or choiceTwo changes


  // Start game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  console.log(cards);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
