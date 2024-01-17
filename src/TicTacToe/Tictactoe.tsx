import React, { useCallback, useEffect, useState } from "react";
import styles from './tictactoe.module.css'
import logo from '../tictactoe.png';


enum Mode {
    '1P' = 0,
    '2P' = 1
}
enum Players {
    'X' = 'X',
    'O' = 'O',
    'AI' = 'AI',
}


const TicTacToe:React.FC<{}> = () => {
    const [mode, setMode] = useState(Mode["1P"]);

    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);

    const checkWinner = useCallback(() => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                let winnerPlayer = squares[a];
                if (mode === Mode["1P"] && squares[a] === Players.O) {
                    winnerPlayer = Players.AI;
                }
                setWinner(winnerPlayer);
                break;
            }
        }
    }, [mode, squares]);

    useEffect(() => {
        checkWinner();
    }, [squares, checkWinner]);

    const handleClick = useCallback((index: number) => {
        if (squares[index] || winner) {
            return;
        }

        const newSquares = [...squares];
        if (currentPlayer === Players.AI) {
            newSquares[index] = Players.O;
        } else {
            newSquares[index] = currentPlayer;
        }
        setSquares(newSquares);
        setTimeout(() => {
            setCurrentPlayer(mode === Mode["1P"] ? currentPlayer === Players.X ? Players.AI : Players.X : currentPlayer === Players.X ? Players.O : Players.X);
        }, 50)

    }, [currentPlayer, squares, mode, winner]);

    useEffect(() => {

        if (currentPlayer === Players.AI && !winner) {
            const currentSquares = [...squares];

            const nullIndexes = currentSquares.map((ele, ind) => { if (ele === null) { return ind; } return undefined; });
            const emptyPlaces = nullIndexes.filter((ele) => ele ?? ele);

            const randomPlaceIndex = Math.floor(Math.random() * emptyPlaces.length);
            const randomPlace = emptyPlaces[randomPlaceIndex];
            if (randomPlace !== undefined) {
                setTimeout(() => {
                    handleClick(randomPlace);
                }, 300)
            }
        }
    }, [currentPlayer, winner]);

    const renderSquare = (index: number) => (
        <button className={styles.square} onClick={() => handleClick(index)}>
            {squares[index] || <span>-</span>}
        </button>
    );

    const modeChange = () => {
        if (mode === Mode["1P"]) {
            setMode(Mode["2P"]);
        } else if (mode === Mode["2P"]) {
            setMode(Mode["1P"]);
        } else {
            setMode(Mode["2P"]);
        }
    }

    const resetGame = () => {
        setMode(Mode["1P"]);
        setCurrentPlayer(Players.X);
        setSquares(Array(9).fill(null));
        setWinner(null);
    }

    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <img src={logo} className={styles.appLogo} alt="logo" />
                <div>
                    <h1>Tic-Tac-Toe</h1>
                </div>
            </header>
            <div className={styles.playground}>
                <div className={styles.game}>
                    <div className={styles.modes}>
                        <span>1P</span>
                        <div className={styles.switch}>
                            <label className={styles.toggleSwitch}>
                                <input type="checkbox" value={mode} checked={mode === Mode["2P"]} onChange={modeChange} />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                        <span>2P</span>
                    </div>
                    <div className={styles.currentPlayer}>{winner ? <h2>Winner is <span>{`${winner}`}</span></h2> : <h2>Player: <span>{`${currentPlayer}`}</span> 's Turn</h2>}</div>
                    <div>
                        <div className={styles.row}>
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className={styles.row}>
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className={styles.row}>
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>
                    <button className={styles.restart} onClick={resetGame}>Restart</button>
                </div>
            </div>
        </div>
    );
}

export default TicTacToe;