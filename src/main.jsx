import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HorizontalScroll from './HorizontalScroll.jsx'
import CometEffect from './Downloadbutton.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
<link
  rel="stylesheet"
  href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
/>
    <App />
    {/*<CometEffect/>*/}
    {/*<HorizontalScroll/>*/}
  </StrictMode>,
)
