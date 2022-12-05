import React from 'react'
import { Link } from 'react-router-dom'
import './UserCard.scss'
import {BsFillLockFill, BsFillUnlockFill} from 'react-icons/bs';

const UserCard = ({id, firstName, lastName, createdAt, isLocked, onLockChange}) => {

    const nameString = `${firstName} ${lastName}`;
    const createdAtString = `Created at: ${createdAt}`;

    const toggleLock = () => {
        onLockChange(id, !isLocked);
    }

    return (
        <div className= {isLocked ? 'wrapper locked' : 'wrapper' }>
            <Link to={`/${id}`}>
            <div className='user-card' data-testid='user-card'>
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
            <div className='lock' onClick={toggleLock}>
                {isLocked 
                    ? <BsFillLockFill /> 
                    : <BsFillUnlockFill /> }
            </div>
        </div>
    )
}

export default UserCard