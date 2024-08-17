import React, { useState, useEffect } from 'react';
import './matching-card-game.css'; 
import backImage from './card-back.jpg'; 
import dakImage from './dak.jpg';
import lambImage from './lamb.jpg';
import rodgersImage from './rodgers.jpg';
import wilsonImage from './wilson.jpg';
import burrowImage from './burrow.jpg';
import chaseImage from './chase.jpg';
import tuaImage from './tagovailoa.jpg';
import hillImage from './hill.jpg';
import mahomesImage from './mahomes.jpg';
import kelceImage from './kelce.jpg';
import jonesImage from './jones.jpg';
import nabersImage from './nabers.jpg';

const initialCards = [
    { name: "Dak Prescott", imgSrc: dakImage, pairId: 1 },
    { name: "CeeDee Lamb", imgSrc: lambImage, pairId: 1 },
    { name: "Aaron Rodgers", imgSrc: rodgersImage, pairId: 2 },
    { name: "Garrett Wilson", imgSrc: wilsonImage, pairId: 2 },
    { name: "Joe Burrow", imgSrc: burrowImage, pairId: 3 },
    { name: "Ja'Marr Chase", imgSrc: chaseImage, pairId: 3 },
    { name: "Tua Tagovailoa", imgSrc: tuaImage, pairId: 4 },
    { name: "Tyreek Hill", imgSrc: hillImage, pairId: 4 },
    { name: "Patrick Mahomes", imgSrc: mahomesImage, pairId: 5 },
    { name: "Travis Kelce", imgSrc: kelceImage, pairId: 5 },
    { name: "Daniel Jones", imgSrc: jonesImage, pairId: 6 },
    { name: "Malik Nabers", imgSrc: nabersImage, pairId: 6 },
];

const MatchingCardGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [errors, setErrors] = useState(0);
  const [coins, setCoins] = useState(0);  
  const [currentGameUnits, setCurrentGameUnits] = useState(0); 
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    let shuffledCards = [...initialCards];
    shuffledCards = shuffledCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards.map((card, index) => ({
      ...card,
      id: index,
      flipped: false,
    })));
    setGameOver(false);
    setFlippedCards([]);
    setErrors(0);
    setCurrentGameUnits(0); 
  };

  const selectCard = (index) => {
    if (flippedCards.length === 2 || gameOver) return;
  
    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
  
    if (flippedCards.length === 1) {
      if (flippedCards[0].pairId === newCards[index].pairId) {
        // Matched cards
        setFlippedCards([]);
        if (newCards.every(card => card.flipped)) {
          setTimeout(() => {
            calculateReward();
            setGameOver(true);
          }, 500);
        }
      } else {
        // Non-matching cards
        setFlippedCards([flippedCards[0], newCards[index]]);
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[flippedCards[0].id].flipped = false;
          resetCards[index].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
          setErrors(prevErrors => prevErrors + 1);
        }, 1000);
      }
    } else {
      setFlippedCards([newCards[index]]);
    }
  };

  const calculateReward = () => {
    let reward = 0;
    if (errors === 0) {
      reward = 20;
    } else if (errors <= 2) {
      reward = 15;
    } else if (errors <= 4) {
      reward = 12;
    } else if (errors <= 6) {
      reward = 10;
    } else {
      reward = 5;
    }
    setCurrentGameUnits(reward); 
    setUnits(prevUnits => prevUnits + reward);
  };

  const playAgain = () => {
    shuffleCards();
    setGameOver(false);
  };

  return (
    <div>
      <h2>Errors: {errors}</h2>
      <h2>Units Won: {currentGameUnits}</h2>
      <h2>Total Coins: {coins}</h2>
      <div id="board">
        {cards.map((card, index) => (
          <img
            key={index}
            id={card.id}
            src={card.flipped ? card.imgSrc : backImage}
            alt={card.name}
            className="card"
            onClick={() => selectCard(index)}
          />
        ))}
      </div>
      {gameOver && (
        <>
          <h3>
            Congratulations! You have finished the game with {errors} mistakes and earned {currentGameUnits} coins.
            <br />
            You have won a total of {coins} coins so far.
          </h3>
          <button onClick={playAgain} style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}>
            Play Again
          </button>
        </>
      )}

      <div className="reward-explanation">
        <h3>Prize Structure</h3>
        <p>You will earn coins based on the number of mistakes you make:</p>
        <ul>
          <li>0 mistakes: 20 coins</li>
          <li>1-2 mistakes: 15 coins</li>
          <li>3-4 mistakes: 12 coins</li>
          <li>5-6 mistakes: 10 coins</li>
          <li>7+ mistakes: 5 coins</li>
        </ul>
      </div>
    </div>
  );
};

export default MatchingCardGame;
