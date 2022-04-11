const TaskValidation = (task) => {
    let errorMsg
    let isValid = true

    if(!task.trim()){
        errorMsg = "Task is required"
        isValid = false
    }

    return [isValid, errorMsg]
}

const DatetimeValidation = (datetime) => {
    let errorMsg
    let isValid = true

    if(!datetime.trim()){
        errorMsg = "Date and Time is required"
        isValid = false
    }
    else{
        try {
            const dateTimeSplit = datetime.split(" ")

            const date = dateTimeSplit[0]
            const time = dateTimeSplit[1]

            const dateSplit = date.split("/")
            const timeSplit = time.split(":")

            const day = dateSplit[0]
            const month = dateSplit[1]
            const year = dateSplit[2]

            const hour = timeSplit[0]
            const minute = timeSplit[1]

            const dateObj = new Date(year, month - 1, day, hour, minute)

            if(dateObj < new Date()){
                errorMsg = "Please select a value greater than current date and time"
                isValid = false
            }
        }
        catch (err) {
            errorMsg = "Please select a value from the calendar popup"
            isValid = false
        }
    }

    return [isValid, errorMsg]
}

export { TaskValidation, DatetimeValidation }