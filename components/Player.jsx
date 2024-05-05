import { useState } from "react";

const Player = ({ name, symbol, isActive}) => {
  const [isEdit, SetEdit] = useState(false);
  const [playerName, SetPlayerName] = useState(name);
  const handleChange = (event) => {
    SetPlayerName(event.target.value)
  }
  const handleClick = () => {
    SetEdit(edit => !edit);
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let button = 'edit'
  if (isEdit)
  {
    editablePlayerName= <input type="text" required value={playerName} onChange={handleChange}></input>
    button = 'save'
  }
  return (
    <li className={isActive ? "active": undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick} >{button}</button>
    </li>
  );
};

export default Player;
