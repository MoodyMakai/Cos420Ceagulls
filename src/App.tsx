import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/snake-image.png'


function App() {
  const handleClick = () => {
    const x = document.getElementById("myDIV");
    if(x==null){
      return
    }
    else{
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }

    // You can call functions, manipulate the DOM, etc.
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
      height: '100vh', // Optional: adjust as needed',
      backgroundImage: `url(${'../src/assets/snake-image.png'})`,
      backgroundSize: 'cover', // Optional: adjust as needed
      backgroundRepeat: 'no-repeat' // Optional

    }}>
          <h1 className='row' style={{ display: 'flex', justifyContent: 'center' }}> SUPER SNAKE</h1>
          <div className='row'>
              <button className="col-3 btn btn-primary">Game Modes</button>
              <div className="col-6"></div>
              <button className="col-3 btn btn-secondary"onClick={handleClick}> High Scores</button>
              
            </div>
            <div className='row'>
              <div className='col-9'>
                <h1 hidden>Do nothing here</h1>
              </div>
              <table id='myDIV' className='col-3 table table-dark ' style={{ display: 'none' }}>
                    <tr>
                      <th>#</th>
                      <th>User Name</th>
                      <th>High Score</th>
                    </tr>
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
                </table>
          </div>
    </div>
    </>
  )
}

export default App
