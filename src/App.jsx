import { useState } from "react";
import GameBoard from "../components/GameBoard";
import Player from "../components/Player";
import Log from "../components/Log";

function App() {
  const [currentTurns, setCurrentTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("O");
  const handleLogs = (rowIndex, 
    colIndex) => {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));

    setCurrentTurns((currentTurns) => {
      let currentPlayer = "X";
      console.log(currentTurns);
      if(currentTurns.length >0 && currentTurns[0].player === "X")
        {
          console.log('Hello');
          currentPlayer= "O";
        }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...currentTurns,
      ];
      return updatedTurns;
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSelectSquare={handleLogs} turns={currentTurns} />
      </div>

    </main>
  );
}

export default App;
