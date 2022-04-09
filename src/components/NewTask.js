import React, { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import DatePicker from "react-datepicker"
import TimePicker from 'react-time-picker'

import "./NewTask.css"

const NewTask = ({setDisplayModal}) => {
    const [startDate, setStartDate] = useState(new Date())
    const [time, setTime] = useState()
    
    return (
        <section className="NewTask-modal">
            <div className="NewTask-popup">
                <div className="NewTask-popupHeader">
                    <h3>New Task</h3>
                    <AiOutlineClose size="1.5em" className="NewTask-closebtn" onClick={() => setDisplayModal(false)} />
                </div>
                <div className="NewTask-popupBody">
                    <form method="POST" action="/">
                        <div className="NewTask-formContainer">
                            <div className="NewTask-inputContainer">
                                <label htmlFor="date">Date:</label>
                                <DatePicker selected={startDate} dateFormat="dd/MM/yyyy" name="date" id="date"
                                    onChange={(date) => setStartDate(date)} className="NewTask-input" />
                            </div>
                            <div className="NewTask-inputContainer">
                                <label htmlFor="time">Time:</label>
                                <TimePicker onChange={setTime} value={time} name="time" id="time" className="NewTask-input time" />
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