import React from "react";
import Box from "./Box";
import "./Board.css";

const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((value, idx) => {
        return (
          <Box
            value={value}
            key={idx}
            onClick={() => {
              if (!value) onClick(idx);
            }}
          />
        );
      })}
    </div>
  );
};

export default Board;
