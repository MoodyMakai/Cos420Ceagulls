import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/super_snake_background.png'
import '../src/assets/super_snake_logo.png'
import '../src/assets/super_snake_skins.png'
import '<div styleName={} />
<source />
<assets />
<skins />default/head.png'
import { useState, useEffect, useRef } from 'react';
import {Skin} from './interfaces/skins';
import {SkinCreate} from './components/skin';


function loadSkins(): Skin[] {

  const skinList = ["default", "square"];
  return skinList.map((skin: string) => SkinCreate(skin));
}

function GameBox({ gameMode }: { gameMode: string }) {
  const [snake1, setSnake1] = useState([{ x: 0, y: 0 }]); // Start at (0,0), aligned with grid
  const [direction1, setDirection1] = useState<'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | null>('ArrowDown'); // Start moving down
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [food, setFood] = useState<{ x: number; y: number }[]>([]);

  const intervalRef1 = useRef<NodeJS.Timeout | null>(null);
  const foodSpawnInterval = useRef<NodeJS.Timeout | null>(null);

  const step = 20;
  const boxSize = 400;
  const playerSize = 20;

  const skins = loadSkins(); // Creates a list of skins
  const selectedSkin = skins[0]

  const generateRandomCoords = () => {
    const max = boxSize / step;
    return {
      x: Math.floor(Math.random() * max) * step,
      y: Math.floor(Math.random() * max) * step,
    };
  };

  // Spawn food periodically
  useEffect(() => {
    if (gameOver) {
      if (foodSpawnInterval.current) {
        clearInterval(foodSpawnInterval.current);
        foodSpawnInterval.current = null;
      }
      return;
    }
  
    foodSpawnInterval.current = setInterval(() => {
      setFood(prev => [...prev, generateRandomCoords()]);
    }, 5000);
  
    return () => clearInterval(foodSpawnInterval.current!);
  }, [gameOver]);

  // Handle arrow key presses
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return; // Ignore input if game is over
  
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
  
        // Prevent the opposite direction
        if (direction1 === 'ArrowUp' && e.key !== 'ArrowDown') {
          setDirection1(e.key as typeof direction1);
        }
        if (direction1 === 'ArrowDown' && e.key !== 'ArrowUp') {
          setDirection1(e.key as typeof direction1);
        }
        if (direction1 === 'ArrowLeft' && e.key !== 'ArrowRight') {
          setDirection1(e.key as typeof direction1);
        }
        if (direction1 === 'ArrowRight' && e.key !== 'ArrowLeft') {
          setDirection1(e.key as typeof direction1);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction1, gameOver]);
  

  // Move snake
  useEffect(() => {
    if (intervalRef1.current) clearInterval(intervalRef1.current);
    intervalRef1.current = setInterval(() => {
      setSnake1(prev => {
        const head = { ...prev[0] };

        // Move based on direction
        if (direction1 === 'ArrowLeft') head.x -= step;
        if (direction1 === 'ArrowRight') head.x += step;
        if (direction1 === 'ArrowUp') head.y -= step;
        if (direction1 === 'ArrowDown') head.y += step;

        // Check if the snake has hit the edge of the screen
        if (head.x < 0 || head.x >= boxSize || head.y < 0 || head.y >= boxSize) {
          setGameOver(true); // Set game over state if out of bounds
          clearInterval(intervalRef1.current!); // Stop snake's movement
          return prev; // Don't update snake if game is over
        }

        // Check for collision with snake's body (excluding the head itself)
        if (prev.some((seg, index) => index !== 0 && seg.x === head.x && seg.y === head.y)) {
          setGameOver(true); // Set game over state
          clearInterval(intervalRef1.current!); // Stop the snake's movement
          return prev; // Don't update snake if game is over
        }

        const newSnake = [head, ...prev.slice(0, prev.length - 1)];

        // Check for collision with any food
        const foodIndex = food.findIndex(f => f.x === head.x && f.y === head.y);
        if (foodIndex !== -1) {
          newSnake.push(prev[prev.length - 1]); // Grow snake
          setFood(prev => prev.filter((_, i) => i !== foodIndex)); // Remove food
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(intervalRef1.current!);
  }, [direction1, food]);

  // Reset the game after a game over
  const handleResetGame = () => {
    setSnake1([{ x: 0, y: 0 }]);
    setDirection1('ArrowDown');
    setFood([]);
    setGameOver(false);
  
    // Clear and reset intervals
    clearInterval(intervalRef1.current!);
    clearInterval(foodSpawnInterval.current!);
    foodSpawnInterval.current = null;
  };
  return (
    <div>
      {/* Snake Game */}
      <div className="col-6"
        style={{
          width: boxSize,
          height: boxSize,
          border: '2px solid black',
          backgroundColor: '#f0f0f0',
          position: 'relative',
          margin: '20px auto',
        }}
      >
        {/* Snake */}
        {snake1.map((seg, index) => (
          <div
            key={index}
            style={{
              width: playerSize,
              height: playerSize,
              backgroundImage: index === 0 ? "./src/assets/skins/default/head.png" : selectedSkin.body,
              position: 'absolute',
              left: seg.x,
              top: seg.y
            }}
          />
        ))}

        {/* Food */}
        {food.map((f, index) => (
          <div
            key={`food-${index}`}
            style={{
              width: playerSize,
              height: playerSize,
              backgroundColor: 'red',
              position: 'absolute',
              left: f.x,
              top: f.y
            }}
          />
        ))}
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            fontSize: '24px',
            textAlign: 'center',
            borderRadius: '8px',
            zIndex: 999,
          }}
        >
          <h1>Game Over</h1>
          <button onClick={handleResetGame} style={{ marginTop: '10px' }}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}


function App() {

  const [showModal, setShowModal] = useState(false);
  const [showHighScoresModal, setShowHighScoresModal] = useState(false);
  const [username, setUsername] = useState('');
  const [inputUsername, setInputUsername] = useState('');

  const [gameMode, setGameMode] = useState<string>('Free Play'); // default to Free Play

const selectGameMode = (mode: string) => {
  setGameMode(mode);
  console.log("Game mode selected:", mode); // optional: for debugging
};


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

  const handleLogin = () => {
    setUsername(inputUsername);
    setShowModal(false);
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
          <button className="col-12 btn btn-info" onClick={() => selectGameMode("Free Play")}>Free Play</button>
          <button className="col-12 btn btn-info" onClick={() => selectGameMode("Local Multiplayer")}>Local Multiplayer</button>
          <button className="col-12 btn btn-info" onClick={() => selectGameMode("Time Attack")}>Time Attack</button>
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
        <div className='row'>
          <div className='col-4' style={{
              textAlign: 'center',
              marginTop: '10px',
              fontSize: '20px',
              color: '#333',
              fontWeight: 'bold',
              fontFamily: 'Segoe UI, Arial, sans-serif'
            }}>
              Game Mode: {gameMode}
            </div>
          
            {username && (
            <div className='col-4'
            style={{
              textAlign: 'center',
              marginTop: '10px',
              fontSize: '24px',
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontFamily: 'Segoe UI, Arial, sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
            }}>
              Welcome, {username}
            </div>
          )}
          <div className='col-4'></div>
        </div>
        <GameBox gameMode={gameMode} />
        
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', marginBottom: 20 }}>
          <button className='btn btn-success'>Play</button>
        </div>
      </div>
{showModal && (
        <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Log In</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Log In</button>
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
