const Log = ({gameTurns}) =>{
    return(
        <ol id="log">
       {gameTurns.map((turn) =>  (<li key={`${turn.square.row}${turn.square.col}`}>{turn.player}</li>))}
  </ol>
    );
}
export default Log;