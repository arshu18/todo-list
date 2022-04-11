import React, { useState, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import DatePicker from "react-datepicker"

// Others
import { TaskValidation, DatetimeValidation } from "../others/Validations"

// Styles
import "./NewTask.css"
import "react-datepicker/dist/react-datepicker.css"

const NewTask = ({setDisplayModal}) => {
    const [selectedDate, setSelectedDate] = useState()
    const [taskErrors, setTaskErrors] = useState({})

    const handleSubmit = (e) => {
        const dateTime = document.getElementById("datetime").value
        const task = document.getElementById("task").value

        const taskErrorsObj = {}

        const [datetimeIsValid, datetimeErrorMsg] = DatetimeValidation(dateTime)
        const [taskIsValid, taskErrorMsg] = TaskValidation(task)

        if(!datetimeIsValid){
            taskErrorsObj.datetime = datetimeErrorMsg
            e.preventDefault()
        }

        if(!taskIsValid){
            taskErrorsObj.task = taskErrorMsg
            e.preventDefault()
        }

        if(Object.keys(taskErrorsObj).length)
            setTaskErrors(taskErrorsObj)
    }

    return (
        <section className="NewTask-modal">
            <div className="NewTask-popup">
                <div className="NewTask-popupHeader">
                    <h3>New Task</h3>
                    <AiOutlineClose size="1.5em" className="NewTask-closebtn" onClick={() => setDisplayModal(false)} />
                </div>
                <div className="NewTask-popupBody">
                    {
                        Object.keys(taskErrors).length !== 0 && (
                            <ul className="NewTask-validationMsg">
                                {
                                    Object.values(taskErrors).map((error, index) => <li key={index}>{error}</li>)
                                }
                            </ul>
                        )
                    }
                    <form method="POST" action="/" onSubmit={handleSubmit}>
                        <div className="NewTask-formContainer">
                            <div className="NewTask-inputContainer">
                                <label htmlFor="datetime">Date and Time:</label>
                                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} className="NewTask-input"
                                 name="datetime" id="datetime" dateFormat="dd/MM/yyyy HH:mm" timeFormat="HH:mm" minDate={new Date()} showTimeSelect />
                            </div>
                            <div className="NewTask-inputContainer">
                                <label htmlFor="task">Task:</label>
                                <textarea className="txtArea" name="task" id="task"></textarea>
                            </div>
                        </div>
                        <button type="submit" className="NewTask-submitBtn">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewTask