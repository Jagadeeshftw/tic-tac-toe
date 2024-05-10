import { useState } from "react";
import GameBoard from "../components/GameBoard";
import Player from "../components/Player";
import Log from "../components/Log";
import { WINNING_COMBINATIONS } from "./WinningCombinations";



const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];



function App() {
  const [currentTurns, setCurrentTurns] = useState([]);
  
let updatedBoard = initialBoard;
for (const turn of currentTurns) {
  const { square, player } = turn;
  const { row, col } = square;
  updatedBoard[row][col] = player;
}
let winner;
for(let combinations of WINNING_COMBINATIONS)
  {
  const firstSymbol = updatedBoard[combinations[0].row][combinations[0].column]
  const secondSymbol = updatedBoard[combinations[1].row][combinations[1].column]
  const thirdSymbol = updatedBoard[combinations[2].row][combinations[2].column]

  if(firstSymbol && firstSymbol === secondSymbol && secondSymbol === thirdSymbol)
    winner = firstSymbol;
}

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
        {winner && <p>you won {winner}</p>}
        <GameBoard onSelectSquare={handleLogs} turns={currentTurns} gameBoard={updatedBoard}/>
      </div>
      <Log turns={currentTurns}/>
    </main>
  );
}

export default App;
