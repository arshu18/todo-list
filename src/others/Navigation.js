import GLOBAL from "../GlobalVar"

const MONTHS = GLOBAL.MONTHS

const Navigation = (heading, type, direction, dispatch) => {
    if(type === "DAY"){
        const headingSplit = heading.split(" ")
        
        const month = MONTHS.indexOf(headingSplit[0])
        const year = parseInt(headingSplit[1])

        if(direction === "P"){
            if(month === 0)
                dispatch({ type : "DAY", month : 11, year : year - 1 })
            else
                dispatch({ type : "DAY", month : month - 1, year })
        }
        else if(direction === "N"){
            if(month === 11)
                dispatch({ type : "DAY", month : 0, year : year + 1 })
            else
                dispatch({ type : "DAY", month : month + 1, year })
        }
    }
    else if(type === "MONTH"){
        const year = parseInt(heading)
        
        if(direction === "P")
            dispatch({ type : "MONTH", year : year - 1 })
        else if(direction === "N")
            dispatch({ type : "MONTH", year : year + 1 })
    }
    else if(type === "YEAR"){
        const headingSplit = heading.split("-")

        const decadeStart = parseInt(headingSplit[0])
        const decadeEnd = parseInt(headingSplit[1])

        if(direction === "P"){
            const updatedDecadeStart = decadeStart - 10
            const updatedDecadeEnd = decadeEnd - 10

            dispatch({ type : "YEAR", decade : updatedDecadeStart + "-" + updatedDecadeEnd })
        }
        else if(direction === "N"){
            const updatedDecadeStart = decadeStart + 10
            const updatedDecadeEnd = decadeEnd + 10

            dispatch({ type : "YEAR", decade : updatedDecadeStart + "-" + updatedDecadeEnd })
        }
    }
}

export default Navigation