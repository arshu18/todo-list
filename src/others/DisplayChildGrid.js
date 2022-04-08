import GLOBAL from "../GlobalVar"

const MONTHS = GLOBAL.MONTHS

const DisplayChildGrid = (heading, innerText, type, dispatch) => {
    if(type === "MONTH"){
        const monthIndex = MONTHS.indexOf(innerText)
        dispatch({ type : "DAY", month : monthIndex, year : parseInt(heading) })
    }
    else if(type === "YEAR"){
        dispatch({ type : "MONTH", year : innerText })
    }
}

export default DisplayChildGrid