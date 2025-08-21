import { useState } from "react"

export default function Player({initName, symbol, isActive, onChangeName}) {

    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initName);
    
    let playerNameEditable = <span className="player-name">{playerName}</span>;

    if (isEditing) {
        playerNameEditable = <input type="text" required value={playerName} onChange={handleNameChange}/>
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {playerNameEditable}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )

    function handleEditing() {
        setIsEditing(editing => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value);
    }
}