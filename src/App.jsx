import { useState } from "react";

import GameBoard from "./component/GameBoard";
import Player from "./component/Player";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./component/GameOver";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && secondSquareSymbol && thirdSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol && 
        secondSquareSymbol === thirdSquareSymbol) {

          winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = structuredClone(INITIAL_GAME_BOARD);

  for (const turn of gameTurns) {
      gameBoard[turn.square.row][turn.square.col] = turn.player;
  }

  return gameBoard;
}

function App() {
  
  const [players, setPlayers] = useState(PLAYERS);

  const[gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      let turn = {square: {row: rowIndex, col: colIndex}, player: currentPlayer};
      const updatedTurns = [turn, ...prevTurns];

      return updatedTurns;
    });
  }

  function restartGame() {
    setGameTurns([]);
  }

  function changePlayerName(symbol, name) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: name
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={changePlayerName}/>
          <Player initName={PLAYERS.O} symbol="0" isActive={activePlayer === 'O'} onChangeName={changePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={restartGame}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  )
}

export default App
