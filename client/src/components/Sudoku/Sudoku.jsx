import React, { useState } from 'react';


// Define the initial grid with some pre-filled values
const initialGrid = [
  [1, 0, 0, 4],
  [0, 2, 0, 0],
  [0, 0, 0, 0],
  [4, 0, 0, 2],
];

const Sudoku = () => {
  const [grid, setGrid] = useState(initialGrid);

  const handleChange = (row, col, value) => {
    // Ensure only valid numbers (1-4) are entered and handle read-only cells
    const newValue = parseInt(value, 10);
    if (isNaN(newValue) || newValue < 1 || newValue > 4) return; // Validate input
    const newGrid = grid.map(row => row.slice());
    newGrid[row][col] = newValue;
    setGrid(newGrid);
  };

  const checkValid = () => {
    const isValid = (arr) => {
      const set = new Set(arr);
      return set.size === arr.length;
    };

    for (let i = 0; i < 4; i++) {
      const row = grid[i];
      const col = grid.map(row => row[i]);
      if (!isValid(row.filter(num => num > 0)) || !isValid(col.filter(num => num > 0))) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="sudoku">
      <div className="sudoku-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                maxLength={1}
                className={`sudoku-cell ${cell !== 0 ? 'read-only' : ''}`}
                readOnly={cell !== 0}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="check-button btn" onClick={() => alert(checkValid() ? 'Valid Sudoku!' : 'Invalid Sudoku.')}>
        Check Sudoku
      </button>
    </div>
  );
};

export default Sudoku;
