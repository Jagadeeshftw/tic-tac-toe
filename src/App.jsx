import { useState } from "react";
import GameBoard from "../components/GameBoard";
import Player from "../components/Player";
import Log from "../components/Log";
import { WINNING_COMBINATIONS } from "./WinningCombinations";
import GameOver from "../components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {

  const [player,setPlayer] = useState(PLAYERS);
  const [currentTurns, setCurrentTurns] = useState([]);
  
let updatedBoard = [...initialBoard.map(array =>[...array])];
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
    winner = player[firstSymbol];
}

   let hasDraw = !winner && currentTurns.length === 9;

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
  const handlePlayerNameChange =(symbol, playername) =>{
       setPlayer(prePlayer => 
        {return {...prePlayer, [symbol] : playername}}
       );
  }
  const handleRestart = () =>{
    setCurrentTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onNameChange={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSelect={handleRestart}/>}
        <GameBoard onSelectSquare={handleLogs} turns={currentTurns} gameBoard={updatedBoard}/>
      </div>
      <Log turns={currentTurns}/>
    </main>
  );
}

export default App;
