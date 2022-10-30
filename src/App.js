/* eslint-disable */
import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import ResetButton from "./components/ResetButton";
function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [isWinner, setIswinner] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isWinner === "X") {
      setMessage("X is winner ");
      let { xScore } = scores;
      xScore += 1;
      setScores({ ...scores, xScore });
    }
    if (isWinner === "O") {
      setMessage("O is winner ");
      let { oScore } = scores;
      oScore += 1;
      setScores({ ...scores, oScore });
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

    const winner = checkWinner(updatedBoard);
    setBoard(updatedBoard);
    if (checkDraw(updatedBoard)) {
      setMessage("Match draw");
      return;
    }

    if (winner) {
      setIswinner(winner);
    }

    setXPlaying(!xPlaying);
    setBoard(updatedBoard);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setMessage("");
    setBoard(Array(9).fill(null));
  };

  return (
    <>
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
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
