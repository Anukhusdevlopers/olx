import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sellform from './CarSelling/Sellform'
import Category from './CarSelling/Category'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    {/* <Sellform/> */}
    <Category/>
    
  </StrictMode>,
)
