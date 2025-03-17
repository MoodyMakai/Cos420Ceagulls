import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


//we should look at https://www.geeksforgeeks.org/create-a-snake-game-using-html-css-and-javascript/
//They have a simple snake game in js and html that we can use as our backbone