import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({id, firstName, lastName, createdAt}) => {

    return (
        <Link to={`/${id}`}>
        <div data-testid='user-card'>
            <h3>{firstName} {lastName}</h3>
            <p>Created at: {createdAt}</p>
        </div>
        </Link>
    )
}

export default UserCard