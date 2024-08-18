import React, { useState } from 'react';

const choices = ['Rock', 'Paper', 'Scissors'];

const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) return 'Draw';
  if (
    (userChoice === 'Rock' && computerChoice === 'Scissors') ||
    (userChoice === 'Paper' && computerChoice === 'Rock') ||
    (userChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    return 'You Win';
  }
  return 'Computer Wins';
};

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (choice) => {
    const compChoice = getRandomChoice();
    setUserChoice(choice);
    setComputerChoice(compChoice);
    setResult(determineWinner(choice, compChoice));
  };

  return (
    <div className="rock-paper-scissors">
      <h2>Rock, Paper, Scissors</h2>
      <div className="choices">
        {choices.map((choice) => (
          <button className="btn"key={choice} onClick={() => handleClick(choice)}>
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