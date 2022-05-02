import React, { createContext, useState, useMemo, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Styles
import "./index.css"

//Components
import Navbar from "./components/Navbar"
import TaskStatus from "./components/TaskStatus"

//Pages
import Home from "./pages/Home"
import DayTasks from "./pages/DayTasks"
import UpcomingTasks from "./pages/UpcomingTasks"

const TaskStatusContext = createContext()

const App = () => {
  const [taskStatus, setTaskStatus] = useState("")

  const value = useMemo(
    () => ({ taskStatus, setTaskStatus }),
    [taskStatus]
  )

  useEffect(() => {
    const taskTimeout = setTimeout(() => {
      setTaskStatus("")
    }, 5000)

    return () => {
      clearTimeout(taskTimeout)
    }
  }, [taskStatus])
  
  return (
    <TaskStatusContext.Provider value={value}>
      <Router>
        <Navbar />
        { taskStatus && <TaskStatus taskStatus={taskStatus} /> }
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/DayTasks/:date/:uui" element={<DayTasks />} />
          <Route path="/UpcomingTasks/:uui" element={<UpcomingTasks/>} />
        </Routes>
      </Router>
    </TaskStatusContext.Provider>
  )
}

export { App as default, TaskStatusContext }
