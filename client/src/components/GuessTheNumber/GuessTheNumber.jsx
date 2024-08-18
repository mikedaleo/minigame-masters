// GuessTheNumber.js
import React, { useState } from 'react';

const GuessTheNumber = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

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
