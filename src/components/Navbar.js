import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Components
import NewTask from "./NewTask"

// CSS
import "./Navbar.css"

const Navbar = () => {
    const [displayModal, setDisplayModal] = useState(false)
    const [displayHamburger, setDisplayHamburger] = useState(false)
    const [displayTabs, setDisplayTabs] = useState(true)
    const [displayVerticalNav, setDisplayVerticalNav] = useState(false)
    
    useEffect(() => {
        const resizeFn = () => {
            if(window.innerWidth <= 600){
                setDisplayHamburger(true)
                setDisplayTabs(false)
            }
            else{
                setDisplayHamburger(false)
                setDisplayTabs(true)
                setDisplayVerticalNav(false)
            }
        }
        
        window.addEventListener("resize", resizeFn)
        return () => window.removeEventListener("resize", resizeFn)
    }, [])
    
    return (
        <>
            { displayModal && <NewTask setDisplayModal={setDisplayModal} /> }
            <nav className="Navbar">
                <Link to="/" className="Navbar-links">Todo List</Link>
                {
                    displayTabs && (
                        <section className="Navbar-navigationContainer">
                            <Link to="/" className="Navbar-Upcoming">Upcoming Tasks</Link>
                            <h4 className="Navbar-Newtask" onClick={() => setDisplayModal(true)}>New Task</h4>
                        </section>
                    )
                }
                {
                    displayHamburger && (
                        <div className="Navbar-Hamburger" onClick={() => setDisplayVerticalNav(prevState => !prevState)}>
                            <div className="Navbar-line"></div>
                            <div className="Navbar-line"></div>
                            <div className="Navbar-line"></div>
                        </div>
                    )
                }
            </nav>
            {
                displayVerticalNav && (
                    <section className="Navbar-vertical">
                        <Link to="/" className="Navbar-Upcoming">Upcoming Tasks</Link>
                        <h4 className="Navbar-Newtask-vertical" onClick={() => setDisplayModal(true)}>New Task</h4>
                    </section>
                )
            }
            
        </>
        
    )
}

export default Navbar