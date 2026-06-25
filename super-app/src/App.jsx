import { fetchCurrentWeather } from "./services/apiServices";
fetchCurrentWeather("London").then(console.log).catch(console.error);

import { useState } from 'react'


import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

function App() {
  

  return (
    <>



    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    
      
    </>
  )
}

export default App
