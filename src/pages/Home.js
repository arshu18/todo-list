import React, { useReducer, useEffect, useRef } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

// Components
import DayGrid from "../components/DayGrid"

// Others
import GLOBAL from "../GlobalVar"
import Navigation from "../others/Navigation"
import HeadingChange from "../others/HeadingChange"
import DisplayChildGrid from "../others/DisplayChildGrid"

// CSS
import "./Home.css"

const MONTHS = GLOBAL.MONTHS

const initialState = {
    view : "",
    grid : [],
    heading : ""
}

const reducer = (state, action) => {
    let newState = {}

    if(action.type === "DAY"){
        const month = action.month
        const year = action.year

        const heading = MONTHS[month] + " " + year
        const noOfDays = new Date(year, month + 1, 0).getDate()   // Month is zero based
        const startPosition = new Date(year, month, 1).getDay()   // Day is zero based
        
        const totalGrid = []

        const prevMonthTotalDays = new Date(year, month, 0).getDate()
        
        for(let i = 0, j = prevMonthTotalDays - (startPosition - 1); i < startPosition; i++, j++){
            let date
            
            if(month === 0){
                date = new Date(year - 1, 11, j)
            }
            else{
                date = new Date(year, month - 1, j)
            }

            totalGrid.push({ date, isCurrentMonth : false })
        }

        for(let i = 1; i <= noOfDays; i++){
            const date = new Date(year, month, i)
            totalGrid.push({ date, isCurrentMonth : true })
        }

        const totalGridLength = totalGrid.length
        
        for(let i = totalGridLength, j = 1; i < 42; i++, j++){
            let date

            if(month === 11){
                date = new Date(year + 1, 0, j)
            }
            else{
                date = new Date(year, month + 1, j)
            }

            totalGrid.push({ date, isCurrentMonth : false })
        }

        newState = {
            view : "DAY",
            grid : totalGrid,
            heading : heading
        }
    }
    else if(action.type === "MONTH"){
        newState = {
            view : "MONTH",
            grid : MONTHS,
            heading : action.year
        }
    }
    else if(action.type === "YEAR"){
        const decadeSplit = action.decade.split("-")

        const decadeStart = parseInt(decadeSplit[0])
        const decadeEnd = parseInt(decadeSplit[1])

        const yearGrid = []

        for(let i = decadeStart; i<= decadeEnd; i++){
            yearGrid.push(i)
        }

        newState = {
            view : "YEAR",
            grid : yearGrid,
            heading : action.decade
        }
    }

    return newState
}

const Home = () => {
    const [calendar, dispatch] = useReducer(reducer, initialState)
    const headingRef = useRef()

    useEffect(() => {
        const date = new Date()
        const month = date.getMonth()
        const year = date.getFullYear()

        dispatch({ type : "DAY", month, year })        
    }, [])

    return (
        <article className="Home-calendar">
            <section className="Home-calendarHeader">
                <BsChevronLeft size="2em" className="Home-leftArrow" onClick={() => 
                    Navigation(headingRef.current.innerText, calendar.view, "P", dispatch)} />
                <h2 className="Home-heading" ref={headingRef} 
                    onClick={() => HeadingChange(headingRef.current.innerText, calendar.view, dispatch)}>{calendar.heading}</h2>
                <BsChevronRight size="2em" className="Home-rightArrow" onClick={() => 
                    Navigation(headingRef.current.innerText, calendar.view, "N", dispatch)} />
            </section>
            <section className="Home-calendarBody">
                {
                    calendar.view === "DAY" && ( <DayGrid grid={calendar.grid} />)
                }
                {
                    (calendar.view === "MONTH" || calendar.view === "YEAR") && (
                        <div className="Home-monthYearList">
                            {
                                calendar.grid.map((grid, index) => {
                                    return <p key={index} className="Home-monthYear" 
                                    onClick={() => DisplayChildGrid(headingRef.current.innerText, grid, calendar.view, dispatch)}>{grid}</p>
                                })
                            }
                        </div>
                    )
                }
            </section>
        </article>
    )
}

export default Home