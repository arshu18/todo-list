import React from "react"
import { Link } from "react-router-dom"

// CSS
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav className="Navbar">
            <Link to="/" className="Navbar-links">Todo List</Link>
            <h4 className="Navbar-Newtask">New Task</h4>
        </nav>
    )
}

export default Navbar