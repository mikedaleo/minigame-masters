// src/Wordle.js
import React, { useState } from 'react';
import './Wordle.css';
import { useMutation } from '@apollo/client';
import { UPDATE_COINS } from '../../utils/mutations';
import Auth from '../../utils/auth';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const WORD_OF_THE_DAY = 'CRANE';

const Wordle = () => {
  const [attempts, setAttempts] = useState(Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill('')));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [result, setResult] = useState('');
  const [letterStatus, setLetterStatus] = useState(Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill('')));
  const [updateCoins] = useMutation(UPDATE_COINS);


  const handleChange = (e) => {
    setCurrentGuess(e.target.value.toUpperCase().slice(0, WORD_LENGTH));
  };

  const handleSubmit = () => {
    if (currentGuess.length !== WORD_LENGTH) return;

    const updatedAttempts = [...attempts];
    const updatedLetterStatus = [...letterStatus];

    updatedAttempts[currentAttempt] = currentGuess.split('');

    const status = Array(WORD_LENGTH).fill(''); // 'correct', 'present', 'absent'

    // Check correct letters and their positions
    currentGuess.split('').forEach((letter, idx) => {
      if (letter === WORD_OF_THE_DAY[idx]) {
        status[idx] = 'correct';
      } else if (WORD_OF_THE_DAY.includes(letter)) {
        status[idx] = 'present';
      } else {
        status[idx] = 'absent';
      }
    });

    updatedLetterStatus[currentAttempt] = status;
    setAttempts(updatedAttempts);
    setLetterStatus(updatedLetterStatus);

    if (currentGuess === WORD_OF_THE_DAY) {
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
      setResult('Congratulations! You guessed the word!');
    } else if (currentAttempt === MAX_ATTEMPTS - 1) {
      setResult(`Game Over! The word was ${WORD_OF_THE_DAY}`);
    } else {
      setCurrentAttempt(currentAttempt + 1);
      setCurrentGuess('');
    }
  };

  const getCellClass = (rowIdx, colIdx) => {
    const status = letterStatus[rowIdx][colIdx];
    if (status === 'correct') return 'cell correct';
    if (status === 'present') return 'cell present';
    if (status === 'absent') return 'cell absent';
    return 'cell';
  };

  return (
    <div className="wordle">
      <h1>Wordle Clone</h1>
      <div className="grid">
        {attempts.map((attempt, rowIdx) => (
          <div key={rowIdx} className="row">
            {attempt.map((letter, colIdx) => (
              <div key={colIdx} className={getCellClass(rowIdx, colIdx)}>
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={currentGuess}
        onChange={handleChange}
        maxLength={WORD_LENGTH}
        placeholder="Enter your guess"
        disabled={result !== ''} // Disable input if the game is over
      />
      <button onClick={handleSubmit} disabled={result !== ''}>Submit</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default Wordle;
