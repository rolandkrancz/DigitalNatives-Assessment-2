import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({id, firstName, lastName, createdAt, isLocked}) => {

    const nameString = `${firstName} ${lastName}`;
    const createdAtString = `Created at: ${createdAt}`;

    return (
        <Link to={`/${id}`}>
        <div data-testid='user-card'>
            <h3>
                {isLocked 
                    ? <strike>{nameString}</strike>
                    : nameString }
            </h3>
            <p>
                {isLocked
                    ? <strike>{createdAtString}</strike>
                    : createdAtString }
            </p>
        </div>
        </Link>
    )
}

export default UserCard