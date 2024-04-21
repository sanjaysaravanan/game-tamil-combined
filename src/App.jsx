import { useState } from "react";
import "./App.css";

function checkWinner(board) {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] !== "-" &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 2]
    ) {
      return board[i];
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[i] !== "-" &&
      board[i] === board[i + 3] &&
      board[i] === board[i + 6]
    ) {
      return board[i];
    }
  }

  // Check diagonals
  if (board[0] !== "-" && board[0] === board[4] && board[0] === board[8]) {
    return board[0];
  }
  if (board[2] !== "-" && board[2] === board[4] && board[2] === board[6]) {
    return board[2];
  }

  // If no winner, return null
  return null;
}

const App = () => {
  const [arr, setArr] = useState(["", "", "", "", "", "", "", "", ""]);

  const [player, setPlayer] = useState("x");

  const displayWinning = (tempArr) => {
    const winner = checkWinner(tempArr);
    console.log(winner);
    if (winner) {
      alert("Winner: " + winner);
      window.location.reload();
    }
  };

  const handleClick = (index) => {
    if (arr[index] === "") {
      const temp = [...arr];

      temp[index] = player;

      // change the player for the next move
      let curPlayer = null;

      if (player === "x") {
        curPlayer = "o";
      } else {
        curPlayer = "x";
      }
      setPlayer(curPlayer);

      setArr(temp);
      setTimeout(() => displayWinning(temp), 10);
    }
  };

  return (
    <div className={"root"}>
      <div className="box-container">
        {arr.map((val, i) => (
          <button
            key={i}
            tabIndex={"0"}
            className="box"
            onClick={() => handleClick(i)}
          >
            {val && (
              <i
                className={`fa-solid fa-${val === "x" ? "xmark" : "o"} fa-7x`}
              ></i>
            )}
          </button>
        ))}
        <div className="line line-x line-x-one"></div>
        <div className="line line-x line-x-two"></div>
        <div className="line line-y line-y-one"></div>
        <div className="line line-y line-y-two"></div>
      </div>
    </div>
  );
};

export default App;
