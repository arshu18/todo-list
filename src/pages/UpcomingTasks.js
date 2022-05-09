import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai"

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

    const DeleteTask = (id) => {
        if(window.confirm("Are you sure to delete the task?")){
            fetch(`${GLOBAL.API_HOST}/api/Task/DeleteFetchUpcomingTask?id=${id}`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body : null
            })
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                    throw new Error("DF")
            })
            .then(data => {
                setTaskList(data)
                setTaskStatus("DS")
            })
            .catch(err => setTaskStatus(err.message))
        }
    }

    return (
        <section className="UpcomingTasks-container">
            <table className="UpcomingTasks-table">
                <thead>
                    <tr>
                        <th className="UpcomingTasks-SNO">S.NO</th>
                        <th className="UpcomingTasks-Task">Task</th>
                        <th className="UpcomingTasks-Date">Date</th>
                        <th className="UpcomingTasks-Time">Time</th>
                        <th className="UpcomingTasks-Actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskList.length === 0 ? (
                            <tr>
                                <td colSpan="5">No Tasks available</td>
                            </tr>
                        ) : (
                            taskList.map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="UpcomingTasks-Taskval">{task.task}</td>
                                        <td>{task.date}</td>
                                        <td>{task.time}</td>
                                        <td>
                                            <button type="button" className="DayTasks-DeleteBtn" onClick={() => DeleteTask(task.id)}>
                                                <AiFillDelete />
                                            </button>
                                        </td>
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