import React from 'react'
import UserCard from '../UserCard/UserCard';
import './UserList.scss'

const UserList = ({users, updateUserStatus}) => {

    const onLockChange = (userId, isLocked) => {
        const status = isLocked ? 'locked' : 'active';
        updateUserStatus(userId, status);
    }

    return(
        <div className='user-list'>
            {users
                ? <ul>
                    {users.map(user => {
                        return <li key={user.id}> 
                                    <UserCard id={user.id}
                                              firstName={user.first_name}
                                              lastName={user.last_name}
                                              createdAt={user.created_at}
                                              isLocked={user.status === 'locked'}
                                              onLockChange={onLockChange}
                                               />
                               </li>
                        })}
                  </ul>
                : <p>Could not load users.</p>
            }
        </div>
    )
}

export default UserList