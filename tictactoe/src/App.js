import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const CROSSES_PLAYER_TURN = 'CROSSED_PLAYER_TURN';
  const ZEROES_PLAYER_TURN = 'ZEROES_PLAYER_TURN';
  const ZEROS_PLAYER_WON = 'ZEROS_PLAYER_WON';
  const CROSSES_PLAYER_WON = 'CROSSES_PLAYER_WON';
  const DRAW = 'DRAW';
  const ERROR_STATE = 'ERROR_STATE';
  const CROSS_CHAR = '✖';
  const ZERO_CHAR = 'O';

  const gameStateDesc = (gameState) => {
    let result = '';
    switch (gameState) {
      case CROSSES_PLAYER_TURN:
        result = 'Crosses player turn';
        break;
      case ZEROES_PLAYER_TURN:
        result = 'Zeros player turn';
        break;
      case CROSSES_PLAYER_WON:
        result = 'Crosses player won';
        break;
      case ZEROS_PLAYER_WON:
        result = 'Zeros player won';
        break;
      case DRAW:
        result = 'Draw';
        break;
      case ERROR_STATE:
        result = 'Error';
        break;
    }
    return result;
  }

  const initialCellsState = [
    '', '', '',
    '', '', '',
    '', '', '',
  ];

  const [gameState, setGameState] = useState();
  const [cells, setCells] = useState(initialCellsState);

  useEffect(() => {
    setGameState(nextGameState());
  }, [cells]);

  const winPatterns = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0]
  ];

  const equals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  const nextGameState = () => {
    if (equals(initialCellsState, cells)) {
      return CROSSES_PLAYER_TURN;
    }

    if (cells.filter(c => c === '').length === 0) {
      return DRAW;
    }

    for (let i = 0; i < winPatterns.length; i++) {
      let p = winPatterns[i];
      let checkWinner = (winnerChar) => {
        let t = p.map((c, idx) => c === 1 ? winnerChar : cells[idx]);
        let result = equals(t, cells);
        return result;
      }

      if (checkWinner(CROSS_CHAR)) {
        return CROSSES_PLAYER_WON;
      }

      if (checkWinner(ZERO_CHAR)) {
        return ZEROS_PLAYER_WON;
      }
    }

    if (gameState === CROSSES_PLAYER_TURN) {
      return ZEROES_PLAYER_TURN;
    }

    if (gameState === ZEROES_PLAYER_TURN) {
      return CROSSES_PLAYER_TURN;
    }

    return ERROR_STATE;
  }

  const onClick = (idx) => {
    if (cells[idx] === '') {
      setCells(
        cells.map((elem, cellIndex) => {
          if (idx === cellIndex) {
            switch (gameState) {
              case CROSSES_PLAYER_TURN:
                return CROSS_CHAR;

              case ZEROES_PLAYER_TURN:
                return ZERO_CHAR;
            }
          }
          return elem;
        })
      );
    }
  }

  const startNewGame = () => {
    setCells(initialCellsState);
  }

  return (
    <div className='app-wrapper'>
      <div className='app-wrapper-content'>
        <div className='header-wrapper'>
          <div className='header-wrapper-content'>
            <button onClick={startNewGame}>NEW GAME</button>
          </div>
          <div className='header-wrapper-content'>{gameStateDesc(gameState)}</div>
        </div>

      </div>
      <div className='app-wrapper-content'>
        <div className='board-wrapper'>
          {
            cells.map((elem, idx) => {
              return (
                <div
                  onClick={() => onClick(idx)}
                  className='board-wrapper-content'>
                  {elem}
                </div>
              );
            })
          }
        </div>
      </div >
    </div >
  );
}

export default App;
