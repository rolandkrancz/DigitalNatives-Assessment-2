import React from 'react'
import UserCard from '../UserCard/UserCard';

const UserList = ({users}) => {

    return(
        <div>
            {users
                ? <ul>
                    {users.map(user => {
                        return <li key={user.id}> 
                                    <UserCard firstName={user.first_name}
                                              lastName={user.last_name}
                                              createdAt={user.created_at} /> 
                               </li>
                        })}
                  </ul>
                : <p>Could not load users.</p>
            }
        </div>
    )
}

export default UserList