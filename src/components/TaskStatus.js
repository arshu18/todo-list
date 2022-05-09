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
        case "TF":
            return "Unable to fetch tasks at the moment"
            break
        case "DF":
            return "Unable to delete the given task"
            break
        case "DS":
            return "Task has been deleted successfully"
        default:
            return ""
    }
}

const getCssClass = (taskStatus) => {
    switch(taskStatus){
        case "AS":
        case "DS":
            return "success"
            break
        case "AF":
        case "TF":
        case "DF":
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