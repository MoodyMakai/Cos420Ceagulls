import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/super_snake_background.png'
import '../src/assets/super_snake_logo.png'
import '../src/assets/super_snake_skins.png'
import { useState, useEffect, useRef } from 'react';
import {Skin} from './interfaces/skins';
import {loadSkins, loadSkins2} from './components/skin';


//Creates and loads the skins


const skins = loadSkins(); // Creates a list of skins
const skins2 = loadSkins2();
let selectedSkin:Skin = skins[0]
let selectedSkin2:Skin = skins2[0]

function updateSkin(index: number){
  selectedSkin = skins[index];
  selectedSkin2 = skins2[index]
}



function GameBox({ gameMode }: { gameMode: string }) {
  const [snake1, setSnake1] = useState([{ x: 0, y: 0, dir: 'ArrowDown' as 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' }]);
  const [direction1, setDirection1] = useState<'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'>('ArrowDown'); // Start moving down
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [food, setFood] = useState<{ x: number; y: number }[]>([]);

  const intervalRef1 = useRef<NodeJS.Timeout | null>(null);
  const foodSpawnInterval = useRef<NodeJS.Timeout | null>(null);

  const [snake2, setSnake2] = useState([{ x: 60, y: 60, dir: 'KeyD' as 'KeyW' | 'KeyS' | 'KeyA' | 'KeyD' }]);
  const [direction2, setDirection2] = useState<'KeyW' | 'KeyS' | 'KeyA' | 'KeyD'>('KeyD'); // Start moving right



  const step = 20;
  const boxSize = 400;
  const playerSize = 24;


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

            // Player 2 Controls (WASD)
            if (['w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
              e.preventDefault();
              const keyMap: { [key: string]: 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD' } = {
                w: 'KeyW',
                W: 'KeyW',
                a: 'KeyA',
                A: 'KeyA',
                s: 'KeyS',
                S: 'KeyS',
                d: 'KeyD',
                D: 'KeyD',
              };
              const opposites: { [key: string]: string } = {
                KeyW: 'KeyS',
                KeyS: 'KeyW',
                KeyA: 'KeyD',
                KeyD: 'KeyA'
              };
              if (direction2 !== opposites[keyMap[e.key]]) {
                setDirection2(keyMap[e.key]);
              }
            }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction1, direction2, gameOver]);
  

  // Move snake
  useEffect(() => {
    if (intervalRef1.current) clearInterval(intervalRef1.current);
    intervalRef1.current = setInterval(() => {
      setSnake1(prev => {
        const head = { ...prev[0] };
      
        // Move head based on current direction
        if (direction1 === 'ArrowLeft') head.x -= step;
        if (direction1 === 'ArrowRight') head.x += step;
        if (direction1 === 'ArrowUp') head.y -= step;
        if (direction1 === 'ArrowDown') head.y += step;
      
        // Check if the snake has hit the edge of the screen
        if (head.x < 0 || head.x >= boxSize || head.y < 0 || head.y >= boxSize) {
          setGameOver(true);
          clearInterval(intervalRef1.current!);
          return prev;
        }
      
        // Check for collision with snake's body (excluding the head itself)
        if (prev.some((seg, index) => index !== 0 && seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          clearInterval(intervalRef1.current!);
          return prev;
        }
      
        // Assign new head direction
        head.dir = direction1;
      
        let newSnake = [head, ...prev.slice(0, prev.length - 1)];
      
        // Check for collision with any food
        const foodIndex = food.findIndex(f => f.x === head.x && f.y === head.y);
        if (foodIndex !== -1) {
          newSnake = [...newSnake, { ...newSnake[newSnake.length - 1] }]; // Grow snake by duplicating last segment
          setFood(prev => prev.filter((_, i) => i !== foodIndex)); // Remove the food
        }
      
        return newSnake;
      });


      setSnake2(prev => {
        if (gameMode !== "Local Multiplayer") return prev;
        const head = { ...prev[0] };
      
        // Move head based on current direction
        if (direction2 === 'KeyA') head.x -= step;
        if (direction2 === 'KeyD') head.x += step;
        if (direction2 === 'KeyW') head.y -= step;
        if (direction2 === 'KeyS') head.y += step;
      
        // Check if the snake has hit the edge of the screen
        if (head.x < 0 || head.x >= boxSize || head.y < 0 || head.y >= boxSize) {
          setGameOver(true);
          clearInterval(intervalRef1.current!);
          return prev;
        }
      
        // Check for collision with snake's body (excluding the head itself)
        if (prev.some((seg, index) => index !== 0 && seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          clearInterval(intervalRef1.current!);
          return prev;
        }
      
        // Assign new head direction
        head.dir = direction2;
      
        let newSnake = [head, ...prev.slice(0, prev.length - 1)];
      
        // Check for collision with any food
        const foodIndex = food.findIndex(f => f.x === head.x && f.y === head.y);
        if (foodIndex !== -1) {
          newSnake = [...newSnake, { ...newSnake[newSnake.length - 1] }]; // Grow snake by duplicating last segment
          setFood(prev => prev.filter((_, i) => i !== foodIndex)); // Remove the food
        }
      
        return newSnake;
      });
    }, 200);

    return () => clearInterval(intervalRef1.current!);
  }, [direction1, direction2, food]);

  // Reset the game after a game over
  const handleResetGame = () => {
    setSnake1([{ x: 0, y: 0 , dir: "ArrowDown"}]);
    setDirection1('ArrowDown');
    setSnake2([{ x: 60, y: 60 , dir: "KeyD"}]);
    setDirection2('KeyW');
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
    {snake1.map((seg, index) => {
      let sprite = '';
      let rotation = 0;

      if (index === 0) {
        // HEAD segment
        sprite = selectedSkin.head;
        if (seg.dir === 'ArrowUp') rotation = 90;
        if (seg.dir === 'ArrowRight') rotation = 180;
        if (seg.dir === 'ArrowDown') rotation = 270;
        if (seg.dir === 'ArrowLeft') rotation = 0;
      } else if (index === snake1.length - 1) {
        // TAIL segment
        sprite = selectedSkin.tail;
        const prev = snake1[index - 1];
        if (prev.dir === 'ArrowUp') rotation = 90;
        if (prev.dir === 'ArrowRight') rotation = 180;
        if (prev.dir === 'ArrowDown') rotation = 270;
        if (prev.dir === 'ArrowLeft') rotation = 0;
      } else {
        // BODY segment
        const prev = snake1[index - 1];
        const next = snake1[index];

        // Check if straight line
        if (prev.dir === next.dir) {
          sprite = selectedSkin.body; // Straight body
          if (seg.dir === 'ArrowUp' || seg.dir === 'ArrowDown') rotation = 270; // Vertical
          else rotation = 0; // Horizontal
        } else {
          // Turning
          sprite = selectedSkin.turn;

        // Figure out the rotation for turn
        if (
          (prev.dir === 'ArrowUp' && next.dir === 'ArrowLeft') ||
          (prev.dir === 'ArrowRight' && next.dir === 'ArrowDown')
        ) {
          rotation = 90; // Turn: Up to Right AND Left to Down
        } else if (
          (prev.dir === 'ArrowUp' && next.dir === 'ArrowRight') ||
          (prev.dir === 'ArrowLeft' && next.dir === 'ArrowDown')
        ) {
          rotation = 0; // Turn: Down to Left AND Right to Up
        } else if (
          (prev.dir === 'ArrowDown' && next.dir === 'ArrowLeft') ||
          (prev.dir === 'ArrowRight' && next.dir === 'ArrowUp')
        ) {
          rotation = 180; // Turn: Down to Right AND Left to Up
        } else if (
          (prev.dir === 'ArrowDown' && next.dir === 'ArrowRight') ||
          (prev.dir === 'ArrowLeft' && next.dir === 'ArrowUp')
        ) {
          rotation = 270; // Turn: Down to Right AND Left to Up
          }
        }
    }

  return (
    <div
      key={index}
      style={{
        width: playerSize,
        height: playerSize,
        backgroundImage: `url(${sprite})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        left: seg.x,
        top: seg.y,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
    />
  );
})}


{snake2.map((seg, index) => {
      let sprite2 = '';
      let rotation = 0;

      if (index === 0) {
        // HEAD segment
        sprite2 = selectedSkin2.head;
        if (seg.dir === 'KeyW') rotation = 90;
        if (seg.dir === 'KeyD') rotation = 180;
        if (seg.dir === 'KeyS') rotation = 270;
        if (seg.dir === 'KeyA') rotation = 0;
      } else if (index === snake1.length - 1) {
        // TAIL segment
        sprite2 = selectedSkin2.tail;
        const prev = snake2[index - 1];
        if (prev.dir === 'KeyW') rotation = 90;
        if (prev.dir === 'KeyD') rotation = 180;
        if (prev.dir === 'KeyS') rotation = 270;
        if (prev.dir === 'KeyA') rotation = 0;
      } else {
        // BODY segment
        const prev = snake2[index - 1];
        const next = snake2[index];

        // Check if straight line
        if (prev.dir === next.dir) {
          sprite2 = selectedSkin2.body; // Straight body
          if (seg.dir === 'KeyW' || seg.dir === 'KeyS') rotation = 270; // Vertical
          else rotation = 0; // Horizontal
        } else {
          // Turning
          sprite2 = selectedSkin2.turn;

        // Figure out the rotation for turn
        if (
          (prev.dir === 'KeyW' && next.dir === 'KeyA') ||
          (prev.dir === 'KeyD' && next.dir === 'KeyS')
        ) {
          rotation = 90; // Turn: Up to Right AND Left to Down
        } else if (
          (prev.dir === 'KeyW' && next.dir === 'KeyD') ||
          (prev.dir === 'KeyA' && next.dir === 'KeyS')
        ) {
          rotation = 0; // Turn: Down to Left AND Right to Up
        } else if (
          (prev.dir === 'KeyS' && next.dir === 'KeyA') ||
          (prev.dir === 'KeyD' && next.dir === 'KeyW')
        ) {
          rotation = 180; // Turn: Down to Right AND Left to Up
        } else if (
          (prev.dir === 'KeyS' && next.dir === 'KeyD') ||
          (prev.dir === 'KeyA' && next.dir === 'KeyW')
        ) {
          rotation = 270; // Turn: Down to Right AND Left to Up
          }
        }
    }

  return (
    gameMode === "Local Multiplayer"  && 
    <div
      key={index}
      style={{
        width: playerSize,
        height: playerSize,
        backgroundImage: `url(${sprite2})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        left: seg.x,
        top: seg.y,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
    />
  );
})}
        {/* Food */}
        {food.map((f, index) => (
          <div
            key={`food-${index}`}
            style={{
              width: playerSize,
              height: playerSize,
              backgroundImage: `url(${selectedSkin.fruit})`,
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
            <button className="col-12 btn btn-warning" onClick={() => updateSkin(0)}> Default </button>
            <button className="col-12 btn btn-warning" onClick={() => updateSkin(1)}> Square </button>
            <button className="col-12 btn btn-warning" onClick={() => updateSkin(2)}> Blurple </button>
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
