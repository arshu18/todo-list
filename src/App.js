import React, { createContext, useState, useMemo } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Styles
import "./index.css"

//Components
import Navbar from "./components/Navbar"

//Pages
import Home from "./pages/Home"

const TaskStatusContext = createContext()

const App = () => {
  const [taskStatus, setTaskStatus] = useState("")

  const value = useMemo(
    () => ({ taskStatus, setTaskStatus }),
    [taskStatus]
  )
  
  return (
    <TaskStatusContext.Provider value={value}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </TaskStatusContext.Provider>
  )
}

export { App as default, TaskStatusContext }
