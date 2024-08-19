import React, { useState, useEffect } from 'react';
import './Game2048.css';
import { useMutation } from '@apollo/client';
import { UPDATE_COINS } from '../../utils/mutations';
import Auth from '../../utils/auth';

const getRandomPosition = () => Math.floor(Math.random() * 4);

const initializeBoard = () => {
  const board = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let i = 0; i < 2; i++) {
    const row = getRandomPosition();
    const col = getRandomPosition();
    board[row][col] = Math.random() > 0.5 ? 2 : 4;
  }
  return board;
};

const mergeLeft = (row) => {
  let newRow = row.filter(val => val !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
      i++;
    }
  }
  newRow = newRow.filter(val => val !== 0);
  return [...newRow, ...Array(4 - newRow.length).fill(0)];
};

const transpose = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]));

const moveLeft = (board) => board.map(row => mergeLeft(row));

const moveRight = (board) => board.map(row => mergeLeft(row.reverse()).reverse());

const moveUp = (board) => transpose(moveLeft(transpose(board)));

const moveDown = (board) => transpose(moveRight(transpose(board)));

const addRandomTile = (board) => {
  const emptyPositions = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) {
        emptyPositions.push({ r, c });
      }
    }
  }
  if (emptyPositions.length === 0) return board;
  const { r, c } = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  board[r][c] = Math.random() > 0.5 ? 2 : 4;
  return board;
};

const checkWin = (board) => board.flat().includes(2048);

const Game2048 = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [gameStatus, setGameStatus] = useState('ongoing');
  const [updateCoins] = useMutation(UPDATE_COINS);


  const handleKeyDown = (e) => {
    let newBoard;
    switch (e.key) {
      case 'ArrowUp':
        newBoard = moveUp(board);
        break;
      case 'ArrowDown':
        newBoard = moveDown(board);
        break;
      case 'ArrowLeft':
        newBoard = moveLeft(board);
        break;
      case 'ArrowRight':
        newBoard = moveRight(board);
        break;
      default:
        return;
    }

    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      const updatedBoard = addRandomTile(newBoard);

      if (checkWin(updatedBoard)) {
        setGameStatus('won');
      } else {
        setBoard(updatedBoard);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [board]);

  const renderStatusMessage = () => {
    if (gameStatus === 'won') {
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
  
      return <div className="game-2048-status">You Win!</div>;
    }
    return null;
  };

  return (
    <div>
      <h2>Use Arrow Keys to Play</h2>
      <div className="game-2048-container">

        {board.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`game-2048-cell game-2048-cell-${cell}`}
              style={{
                transform: `translate(${cellIndex * 110}px, ${rowIndex * 110}px)`,
              }}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))
        ))}
        {renderStatusMessage()}

      </div>
    </div>
  );
};

export default Game2048;

