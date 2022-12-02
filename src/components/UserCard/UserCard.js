import React from 'react'

const UserCard = ({firstName, lastName, createdAt}) => {

    return (
        <div data-testid='user-card'>
            <h3>{firstName} {lastName}</h3>
            <p>Created at: {createdAt}</p>
        </div>
    )
}

export default UserCard