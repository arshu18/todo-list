import React from "react"

import "../components/TaskStatus.css"

const getStatusMsg = (taskStatus) => {
    switch(taskStatus){
        case "AS":
            return "Task added successfully"
            break
        case "AF":
            return "Task cannot be added"
            break
        default:
            return ""
    }
}

const getCssClass = (taskStatus) => {
    switch(taskStatus){
        case "AS":
            return "success"
            break
        case "AF":
            return "failure"
            break
        default:
            return ""
    }
}

const TaskStatus = ({ taskStatus }) => {
    return (
        <div className={`TaskStatus-promptMsg ${getCssClass(taskStatus)}`}>
            <p>{getStatusMsg(taskStatus)}</p>
        </div>
    )
}

export default TaskStatus