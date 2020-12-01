import './App.css';
import React, { useState } from 'react';

function App() {

  const [isCrossedPlayerTurn, setIsCrossedPlayerTurn] = useState(true);
  const [cells, setCells] = useState([
    '', '', '',
    '', '', '', 
    '', '', '',
  ]);

  const onClick = (idx) => {
    let changeTurn = false;
    if (cells[idx] === '') {
      setCells(
        cells.map((elem, cellIndex) => {
          if (idx === cellIndex) {
            changeTurn = true;
            return isCrossedPlayerTurn ? 'X' : 'O';
          }
          return elem;
        })
      );
      if (changeTurn) {
        setIsCrossedPlayerTurn(!isCrossedPlayerTurn);
      }
    }
  }


  return (
    <div className='app-wrapper'>
      {
        cells.map((elem, idx) => {
          console.log(idx);
          return (
            <div
              onClick={() => onClick(idx)}
              className='app-wrapper-content'>
              {elem}
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
