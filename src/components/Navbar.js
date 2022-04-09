import React, { useState } from "react"
import { Link } from "react-router-dom"

// Components
import NewTask from "./NewTask"

// CSS
import "./Navbar.css"

const Navbar = () => {
    const [displayModal, setDisplayModal] = useState(false)
    
    return (
        <>
            { displayModal && <NewTask setDisplayModal={setDisplayModal} /> }
            <nav className="Navbar">
                <Link to="/" className="Navbar-links">Todo List</Link>
                <h4 className="Navbar-Newtask" onClick={() => setDisplayModal(true)}>New Task</h4>
            </nav>
        </>
        
    )
}

export default Navbar