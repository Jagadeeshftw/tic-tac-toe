import { useState } from "react";
import GameBoard from "../components/GameBoard";
import Player from "../components/Player";
import Log from "../components/Log";

function App() {
  const [currentTurns, setCurrentTurns] = useState([]);
  

  const getActivePlayer = (currentTurns) =>{
    let currentPlayer = 'X';

    if (currentTurns.length > 0 && currentTurns[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;
  }
  const activePlayer = getActivePlayer(currentTurns);
  const handleLogs = (rowIndex, colIndex) => {
    
    setCurrentTurns((gameTurns) => {
      let currentPlayer = getActivePlayer(gameTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...gameTurns,
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
      <Log turns={currentTurns}/>
    </main>
  );
}

export default App;
