
export default function GameBoard( {onSelectSquare, board}) {

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prev) => {
    //         //const newBoard = [...prev.map(inner => [...inner])];
    //         const newBoard = structuredClone(prev);
    //         newBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return newBoard;
    //     });

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol}>
                                    {playerSymbol}
                                </button>
                            </li>)}
                    </ol>
                </li>)}
        </ol>
    )
}