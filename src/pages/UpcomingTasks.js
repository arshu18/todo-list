import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"

// Styles
import "../pages/UpcomingTasks.css"

// Others
import GLOBAL from "../GlobalVar"
import { TaskStatusContext } from "../App"

const UpcomingTasks = () => {
    const [taskList, setTaskList] = useState([])
    const { setTaskStatus } = useContext(TaskStatusContext)
    const { uui } = useParams()

    useEffect(() => {
        fetch(`${GLOBAL.API_HOST}/api/Task/UpcomingTasks`)
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
        <section className="UpcomingTasks-container">
            <table className="UpcomingTasks-table">
                <thead>
                    <tr>
                        <th className="UpcomingTasks-SNO">S.NO</th>
                        <th className="UpcomingTasks-Task">Task</th>
                        <th className="UpcomingTasks-Date">Date</th>
                        <th className="UpcomingTasks-Time">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskList.length === 0 ? (
                            <tr>
                                <td colSpan="4">No Tasks available</td>
                            </tr>
                        ) : (
                            taskList.map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="UpcomingTasks-Taskval">{task.task}</td>
                                        <td>{task.date}</td>
                                        <td>{task.time}</td>
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>
            </table>
        </section>
    )
}

export default UpcomingTasks