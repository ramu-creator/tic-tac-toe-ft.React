import { useState } from 'react';
import "./styles/tictactoe.css";

function Btn({ value, onBtnClick }) {
  return (
    <button className="square" onClick={onBtnClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [next, setNext] = useState(true);
  const [boxes, setBoxes] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(boxes) || boxes[i]) return; // If there's a winner or the box is already filled, return

    const nextSquares = [...boxes];
    nextSquares[i] = next ? 'X' : 'O'; // Set 'X' or 'O' based on the player's turn
    setBoxes(nextSquares);
    setNext(!next); // Switch turns
  }

  const winner = calculateWinner(boxes);
  const isBoardFull = boxes.every((square) => square !== null); // Check if all boxes are filled

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "It's a tie!";
  } else {
    status = `Next player: ${next ? 'X' : 'O'}`;
  }

  return (
    <div className="container">
      <div className="status">TIC-TAC-TOE</div>
      <div className="status">{status}</div>

      <div className="board-row">
        <Btn value={boxes[0]} onBtnClick={() => handleClick(0)} />
        <Btn value={boxes[1]} onBtnClick={() => handleClick(1)} />
        <Btn value={boxes[2]} onBtnClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Btn value={boxes[3]} onBtnClick={() => handleClick(3)} />
        <Btn value={boxes[4]} onBtnClick={() => handleClick(4)} />
        <Btn value={boxes[5]} onBtnClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Btn value={boxes[6]} onBtnClick={() => handleClick(6)} />
        <Btn value={boxes[7]} onBtnClick={() => handleClick(7)} />
        <Btn value={boxes[8]} onBtnClick={() => handleClick(8)} />
      </div>

    </div>
  );
}

function calculateWinner(boxes) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  }
  return null;
}
