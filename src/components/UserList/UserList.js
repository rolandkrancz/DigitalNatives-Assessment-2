import React from 'react'
import UserCard from '../UserCard/UserCard';

const UserList = ({users}) => {

    return(
        <div>
            {users
                ? <ul>
                    {users.map(user => {
                        return <li key={user.id}> 
                                    <UserCard id={user.id}
                                              firstName={user.first_name}
                                              lastName={user.last_name}
                                              createdAt={user.created_at}
                                              isLocked={user.status === 'locked'}
                                               />
                                    <label htmlFor='isLocked'>Locked:</label>
                                    <input name='isLocked' type={'checkbox'} checked={user.status === 'locked'} />
                               </li>
                        })}
                  </ul>
                : <p>Could not load users.</p>
            }
        </div>
    )
}

export default UserList