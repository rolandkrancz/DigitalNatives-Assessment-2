import React, { useEffect, useState } from 'react'
import UserList from '../../components/UserList/UserList';

const Home = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        const fetchUsers = async () => {
            fetch('https://assessment-users-backend.herokuapp.com/users', 
            {
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then(users => {
                setUsers(users);
            })
            .catch((err) => {
                console.log(err);
                setError('Could not fetch users.');
            });
        }

        setIsLoading(true);
        fetchUsers();
        setIsLoading(false);
    }, [])

    return (
        <div>
            <h2>Home</h2>
            {error 
                ? <h3>Error: {error}</h3>
                : isLoading
                    ? <div>Loading users, please wait..</div> 
                    : <UserList users={users} />
            }
        </div>
    )
}

export default Home