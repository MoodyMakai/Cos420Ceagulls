import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/super_snake_background.png'
import '../src/assets/super_snake_logo.png'
import '../src/assets/super_snake_skins.png'
//Adding this as a test

import { useState } from 'react';

function App() {

  const [showModal, setShowModal] = useState(false);

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
          <button className="col-3 btn btn-primary" onClick={() => toggleVisibility("gameModes")}>Game Modes</button>
          <div className="col-2"></div>
          <button className="col-2 btn btn-success" onClick={() => toggleVisibility("selectSkin")}>
            <img src = '../src/assets/super_snake_skins.png' alt = "Skins"></img>
          </button>
          <div className="col-2"></div>
          <button className="col-3 btn btn-primary">Game Modes</button>
          <div className="col-2"></div>
          <button className="col-2 btn btn-info" onClick={() => setShowModal(true)}>Log In</button>
          <div className="col-2"></div>
          <button className="col-3 btn btn-secondary" onClick={() => toggleVisibility("highScores")}>High Scores</button>
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
          <div className='col-2'>
            <h1 hidden>Do nothing here</h1>
          </div>
          <div className='col-3'>
            <table id="highScores" className='table table-dark' style={{ visibility: 'hidden', height: '0', overflow: 'hidden' }}>
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
        </div>
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

    </>
  );
}

export default App;
