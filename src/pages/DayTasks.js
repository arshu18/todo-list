import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

// Styles
import "../pages/DayTasks.css"

// Others
import GLOBAL from "../GlobalVar"
import { TaskStatusContext } from "../App"

const DayTasks = () => {
    const { date, uui } = useParams()
    const [taskList, setTaskList] = useState([])
    const { setTaskStatus } = useContext(TaskStatusContext)
    
    useEffect(() => {
        fetch(`${GLOBAL.API_HOST}/api/Task/GetTasks?date=${date}`)
        .then(response => {
            if(response.ok)
                return response.json()
            else
                throw new Error("TF")
        })
        .then(data => setTaskList(data))
        .catch(err => setTaskStatus(err.message))       
    }, [uui])

    return (
        <table className="DayTasks-table">
            <thead>
                <tr>
                    <th className="DayTasks-SNO">S.NO</th>
                    <th className="DayTasks-Task">Task</th>
                    <th className="DayTasks-Time">Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    taskList.length === 0 ? (
                        <tr>
                            <td colSpan="3">No Tasks available</td>
                        </tr>
                    ) : (
                        taskList.map((task, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="DayTasks-Taskval">{task.task}</td>
                                    <td>{task.time}</td>
                                </tr>
                            )
                        })
                    )
                }
            </tbody>
        </table>
    )
}

export default DayTasks