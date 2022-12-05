import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.scss'

const Nav = () => {
    return (
        <nav>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/new'}>Add</NavLink>
        </nav>
    )
}

export default Nav