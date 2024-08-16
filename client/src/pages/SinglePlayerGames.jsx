import React, { useState } from 'react';
import MatchingCardGame from '../components/MatchingGame/matching-card-game';
import GuessTheNumber from '../components/GuessTheNumber/GuessTheNumber';
import RockPaperScissors from '../components/RockPaperScissors/RockPaperScissors';
import Sudoku from '../components/Sudoku/Sudoku';
import '../SinglePlayerGames.css'; // Import the CSS file for styling

function SinglePlayerGames() {
  const [activeGame, setActiveGame] = useState(null); // Initialize with null

  const handleGameChange = (game) => {
    setActiveGame(game);
  };

  return (
    <div className="single-player-games">
      <div className="button-group">
        <button
          className={`game-button ${activeGame === 'matchingCardGame' ? 'active' : ''}`}
          onClick={() => handleGameChange('matchingCardGame')}
        >
          Matching Card Game
        </button>
        <button
          className={`game-button ${activeGame === 'guessTheNumber' ? 'active' : ''}`}
          onClick={() => handleGameChange('guessTheNumber')}
        >
          Guess The Number
        </button>
        <button
          className={`game-button ${activeGame === 'rockPaperScissors' ? 'active' : ''}`}
          onClick={() => handleGameChange('rockPaperScissors')}
        >
          Rock, Paper, Scissors
        </button>
        <button
          className={`game-button ${activeGame === 'sudoku' ? 'active' : ''}`}
          onClick={() => handleGameChange('sudoku')}
        >
          Sudoku
        </button>
      </div>

      <div className="game-container">
        {activeGame === 'matchingCardGame' && <MatchingCardGame />}
        {activeGame === 'guessTheNumber' && <GuessTheNumber />}
        {activeGame === 'rockPaperScissors' && <RockPaperScissors />}
        {activeGame === 'sudoku' && <Sudoku />}
      </div>
    </div>
  );
}

export default SinglePlayerGames;
