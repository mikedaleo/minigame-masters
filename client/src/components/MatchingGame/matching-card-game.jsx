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
import { useMutation } from '@apollo/client';
import { UPDATE_COINS } from '../../utils/mutations';
import Auth from '../../utils/auth';

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
  const [currentGameCoins, setCurrentGameCoins] = useState(0); 
  const [gameOver, setGameOver] = useState(false);
  const [updateCoins] = useMutation(UPDATE_COINS);

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
    setCurrentGameCoins(0); 
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

  const updateCoinsFunction = async () => {
    try {
      await updateCoins({
        variables: {
          userId: Auth.getProfile().data._id,
          coins: Auth.getProfile().data.coins,
        },
      });
    } catch (error) {
      console.error('Error updating coins:', error);
    }
  }

  const calculateReward = () => {
    let reward = 0;
    if (errors <= 1) {
      updateCoinsFunction();
      updateCoinsFunction();
      updateCoinsFunction();
      reward = 30;
    } else if (errors <= 5) {
      updateCoinsFunction();
      updateCoinsFunction();
      reward = 20;
    } else {
      updateCoinsFunction();
      reward = 10;
    }
    setCurrentGameCoins(reward); 
    setCoins(prevCoins => prevCoins + reward);
  };

  const playAgain = () => {
    shuffleCards();
    setGameOver(false);
  };

  return (
    <div>
      <h2>Errors: {errors}</h2>
      <h2>Coins Won: {currentGameCoins}</h2>
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
            Congratulations! You have finished the game with {errors} mistakes and earned {currentGameCoins} coins.
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
          <li>0-1 mistakes: 30 coins</li>
          <li>2-5 mistakes: 20 coins</li>
          <li>6+ mistakes: 10 coins</li>
        </ul>
      </div>
    </div>
  );
};

export default MatchingCardGame;
