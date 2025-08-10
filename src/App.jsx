import GameBoard from "./component/GameBoard";
import Player from "./component/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initName="Player 1" symbol="X"/>
          <Player initName="Player 2" symbol="0"/>
        </ol>
        <GameBoard />
      </div>
    </main>
  )
}

export default App
