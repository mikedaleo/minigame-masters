import React, { useState } from 'react';
import MatchingCardGame from '../components/MatchingGame/matching-card-game';
import GuessTheNumber from '../components/GuessTheNumber/GuessTheNumber';
import RockPaperScissors from '../components/RockPaperScissors/RockPaperScissors';
import Sudoku from '../components/Sudoku/Sudoku';
import Wordle from '../components/Wordle/Wordle';
import Game2048 from '../components/Game2048/Game2048'; // Import the 2048 game component
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
        <button
          className={`game-button ${activeGame === 'game2048' ? 'active' : ''}`} // New button for 2048 game
          onClick={() => handleGameChange('game2048')}
        >
          2048
        </button>
        <button
          className={`game-button ${activeGame === 'wordle' ? 'active' : ''}`} // New button for 2048 game
          onClick={() => handleGameChange('wordle')}
        >
          Wordle
        </button>
      </div>

      <div className="game-container">
        {activeGame === 'matchingCardGame' && <MatchingCardGame />}
        {activeGame === 'guessTheNumber' && <GuessTheNumber />}
        {activeGame === 'rockPaperScissors' && <RockPaperScissors />}
        {activeGame === 'sudoku' && <Sudoku />}
        {activeGame === 'game2048' && <Game2048 />} {/* Render the 2048 game */}
        {activeGame === 'wordle' && <Wordle />} {/* Render Wordle */}
      </div>
    </div>
  );
}

export default SinglePlayerGames;

