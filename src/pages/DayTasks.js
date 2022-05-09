import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { AiFillDelete } from "react-icons/ai"

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

    const DeleteTask = (id) => {
        if(window.confirm("Are you sure to delete the task?")){
            fetch(`${GLOBAL.API_HOST}/api/Task/Delete?id=${id}&date=${date}`, {
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
        <section className="DayTasks-container">
            <table className="DayTasks-table">
                <thead>
                    <tr>
                        <th className="DayTasks-SNO">S.NO</th>
                        <th className="DayTasks-Task">Task</th>
                        <th className="DayTasks-Time">Time</th>
                        <th className="DayTasks-Actions">Actions</th>
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
                                        <td className="DayTasks-Taskval">{task.task}</td>
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

export default DayTasks