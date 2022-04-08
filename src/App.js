import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Styles
import "./index.css"

//Components
import Navbar from "./components/Navbar"

//Pages
import Home from "./pages/Home"

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App;
