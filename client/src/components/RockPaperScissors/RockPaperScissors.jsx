import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_COINS } from '../../utils/mutations';
import Auth from '../../utils/auth';


const choices = ['✊Rock', '✋Paper', '✌Scissors'];

const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const RockPaperScissors = ({ userId }) => {
  const [updateCoins] = useMutation(UPDATE_COINS);
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) return 'Draw';
    if (
      (userChoice === '✊Rock' && computerChoice === '✌Scissors') ||
      (userChoice === '✋Paper' && computerChoice === '✊Rock') ||
      (userChoice === '✌Scissors' && computerChoice === '✋Paper')
    ) {
      // User wins
      return 'You Win';
    }
    return 'Computer Wins';
  };

  const handleClick = async (choice) => {
    const compChoice = getRandomChoice();
    setUserChoice(choice);
    setComputerChoice(compChoice);

    const gameResult = determineWinner(choice, compChoice);
    setResult(gameResult);

    if (gameResult === 'You Win') {
      
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
  };

  return (
    <div className="rock-paper-scissors">
      <h2>Rock, Paper, Scissors</h2>
      <div className="choices">
        {choices.map((choice) => (
          <button className="btn" key={choice} onClick={() => handleClick(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <div className="result">
        {userChoice && <p>You chose: {userChoice}</p>}
        {computerChoice && <p>Computer chose: {computerChoice}</p>}
        {result && <p>{result}</p>}
      </div>
    </div>
  );
};

export default RockPaperScissors;
