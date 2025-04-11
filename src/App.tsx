import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/super_snake_background.png'
import '../src/assets/super_snake_logo.png'
import '../src/assets/super_snake_skins.png'


import { useState, useEffect, useRef } from 'react';



function GameBox() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState<'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const step = 20;
  const boxSize = 400;
  const playerSize = 20;

  // Handle keypresses to update direction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        setDirection(e.key as typeof direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Move based on direction at an interval
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setX(prevX => {
        if (direction === 'ArrowLeft') return Math.max(0, prevX - step);
        if (direction === 'ArrowRight') return Math.min(boxSize - playerSize, prevX + step);
        return prevX;
      });
      setY(prevY => {
        if (direction === 'ArrowUp') return Math.max(0, prevY - step);
        if (direction === 'ArrowDown') return Math.min(boxSize - playerSize, prevY + step);
        return prevY;
      });
    }, 300); // adjust interval speed here

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [direction]);

  return (
    <div
      style={{
        width: boxSize,
        height: boxSize,
        border: '2px solid black',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        margin: '20px auto'
      }}
    >
      <div
        style={{
          width: playerSize,
          height: playerSize,
          backgroundColor: 'green',
          position: 'absolute',
          left: x,
          top: y
        }}
      />
    </div>
  );
}


function App() {

  const [showModal, setShowModal] = useState(false);
  const [showHighScoresModal, setShowHighScoresModal] = useState(false);


  const toggleVisibility = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (element.style.visibility === "hidden") {
        element.style.visibility = "visible";
        element.style.height = "auto";
      } else {
        element.style.visibility = "hidden";
        element.style.height = "0";
      }
    }
  };
  return (
    <>
      <div style={{ 
        margin: 0, 
        padding: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${'../src/assets/super_snake_background.png'})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <h1>
          <img src = '../src/assets/super_snake_logo.png' alt = "SUPER SNAKE"></img>
        </h1>        

        <div className='row'>
            <button className="col-3 btn btn-primary">Game Modes</button> 
            <div className="col-2"></div>
            <div className="col-2">
                <button className="col-12 btn btn-info" onClick={() => setShowModal(true)}>Log In</button>
                <button className="col-12 btn btn-success" onClick={() => toggleVisibility("selectSkin")}>
                    <img src = '../src/assets/super_snake_skins.png' alt = "Skins"></img>
                </button>
            </div>
              <div className="col-2"></div>
              <button className="col-3 btn btn-secondary" onClick={() => setShowHighScoresModal(true)}>High Scores</button>
        </div>

        <div className='row'>
          <div id="gameModes" className='col-3'>
            <button className="col-12 btn btn-info">Free Play</button>
            <button className="col-12 btn btn-info">Local Multiplayer</button>
            <button className="col-12 btn btn-info">Time Attack</button>
          </div>
          <div className='col-2'>
            <h1 hidden>Do nothing here</h1>
          </div>
          <div id="selectSkin" className='col-2' style={{ visibility: 'hidden', height: '0', overflow: 'hidden' }}>
            <button className="col-12 btn btn-warning"> Default </button>
            <button className="col-12 btn btn-warning"> Square </button>
            <button className="col-12 btn btn-warning"> Skin option 3</button>
          </div>
          <div className='col-5'>
            <h1 hidden>Do nothing here</h1>
          </div>
        </div>
        <GameBox />
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', marginBottom: 20 }}>
          <button className='btn btn-success'>Play</button>
        </div>
      </div>
      {showModal && (
        <div className="modal fade show" tabIndex={-1} style={{ display: 'block'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Log In</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter your username"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Log In</button>
              </div>
            </div>
          </div>
        </div>
      )}

{showHighScoresModal && (
  <div className={`highscores-modal show`}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4>High Scores</h4>
      <button className="btn-close btn-close-white" onClick={() => setShowHighScoresModal(false)}></button>
    </div>
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>High Score</th>
        </tr>
      </thead>
      <tbody>
                      <tr>
                        <td>1</td>
                        <td>AAA</td>
                        <td>200</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>BBB</td>
                        <td>180</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>CCC</td>
                        <td>160</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>DDD</td>
                        <td>140</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>EEE</td>
                        <td>120</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>FFF</td>
                        <td>100</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>GGG</td>
                        <td>80</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>HHH</td>
                        <td>60</td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>III</td>
                        <td>40</td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>JJJ</td>
                        <td>20</td>
                      </tr>
              </tbody>
    </table>
  </div>
)}

    </>
  );
}

export default App;
