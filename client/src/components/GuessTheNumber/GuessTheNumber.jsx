// GuessTheNumber.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_COINS } from '../../utils/mutations';
import Auth from '../../utils/auth';

const GuessTheNumber = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [updateCoins] = useMutation(UPDATE_COINS);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const numGuess = parseInt(guess, 10);
    
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('Please enter a number between 1 and 100.');
      return;
    }

    if (numGuess === targetNumber) {
      setMessage('Congratulations! You guessed the number!');
      
      try {
         updateCoins({
          variables: {
            userId: Auth.getProfile().data._id,
            coins: Auth.getProfile().data.coins,
          },
        });
      } catch (error) {
        console.error('Error updating coins:', error);
      }

      // Reset the game
      setTargetNumber(generateRandomNumber());
      setGuess('');
    } else if (numGuess < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Guess the Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter a number between 1 and 100"
        />
        <button className="btn" type="submit">Submit Guess</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default GuessTheNumber;
