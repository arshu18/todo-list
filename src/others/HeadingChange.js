const HeadingChange = (heading, prevView, dispatch) => {
    if(prevView === "DAY"){
        const headingSplit = heading.split(" ")
        const year = headingSplit[1]

        dispatch({ type : "MONTH", year })
    }
    else if(prevView === "MONTH"){
        const decadeStart = heading.replace(/.$/, "0")
        const decadeEnd = heading.replace(/.$/, "9")

        const updatedHeading = decadeStart + "-" + decadeEnd

        dispatch({ type : "YEAR", decade : updatedHeading })
    }
}

export default HeadingChange