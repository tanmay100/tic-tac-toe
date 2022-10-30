/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";
function App() {
  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIswinner] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isWinner === "X") {
      setMessage("X is winner ");
      setScores({ ...scores, xScore: scores.xScore + 1 });
    }
    if (isWinner === "O") {
      setMessage("O is winner ");
      setScores({ ...scores, oScore: scores.oScore + 1 });
    }
  }, [isWinner]);

  const checkDraw = (updatedboard) => {
    let count = 0;
    updatedboard.forEach((element) => {
      if (element) {
        count++;
      }
    });

    if (count >= 9) {
      return true;
    } else {
      return false;
    }
  };

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = calculateWinner(updatedBoard);

    // checkWinner(updatedBoard);
    if (checkDraw(updatedBoard)) {
      setMessage("Match draw");
      return;
    }
    if (winner?.winnerType) {
      setIswinner(winner.winnerType);
    }

    setXPlaying(!xPlaying);
    setBoard(updatedBoard);
  };

  const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        const winningData = {
          winnerType: squares[a],
          indexes: [a, b, c],
        };
        return winningData;
      }
    }
    return null;
  };

  const resetBoard = () => {
    setGameOver(false);
    setMessage("");
    setBoard(Array(9).fill(null));
    setIswinner({});
  };

  return (
    <>
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board
        board={board}
        winner={isWinner}
        onClick={gameOver ? resetBoard : handleBoxClick}
      />
      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
      <ResetButton resetBoard={resetBoard} />
    </>
  );
}

export default App;
