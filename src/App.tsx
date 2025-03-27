import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/super_snake_background.png'
import '../src/assets/super_snake_logo.png'



function App() {
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
          <div className="col-6"></div>
          <button className="col-3 btn btn-secondary" onClick={() => toggleVisibility("highScores")}>High Scores</button>
        </div>

        <div className='row'>
          <div id="gameModes" className='col-3' style={{ visibility: 'hidden', height: '0', overflow: 'hidden' }}>
            <button className="col-12 btn btn-info">Free Play</button>
            <button className="col-12 btn btn-info">Local Multiplayer</button>
            <button className="col-12 btn btn-info">Timed Mode</button>
          </div>
          <div className='col-6'>
            <h1 hidden>Do nothing here</h1>
          </div>
          <table id="highScores" className='col-3 table table-dark' style={{ visibility: 'hidden', height: '0', overflow: 'hidden' }}>
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
                      <td>10000</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>BBB</td>
                      <td>9000</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>CCC</td>
                      <td>8000</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>DDD</td>
                      <td>7000</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>EEE</td>
                      <td>6000</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>FFF</td>
                      <td>5000</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>GGG</td>
                      <td>4000</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>HHH</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>III</td>
                      <td>2000</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>JJJ</td>
                      <td>1000</td>
                    </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', marginBottom: 20 }}>
          <button className='btn btn-success'>Play</button>
        </div>
      </div>
    </>
  );
}

export default App;
