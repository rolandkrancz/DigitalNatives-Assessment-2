import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import UserList from '../../components/UserList/UserList';

export const USERS_PER_PAGE = 10;

const Home = () => {

    const [users, setUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);
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
                setCurrentUsers(users.slice(0, USERS_PER_PAGE));
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


    const handlePageClick = (event) => {
        const pageNumber = event.selected + 1;
        const indexOfLastDisplayedUser = pageNumber * USERS_PER_PAGE; 
        const indexOfFirstDisplayedUser = indexOfLastDisplayedUser - USERS_PER_PAGE;
        setCurrentUsers(users.slice(indexOfFirstDisplayedUser, indexOfLastDisplayedUser));
    }

    return (
        <div>
            <h2>Home</h2>
            {error 
                ? <h3>Error: {error}</h3>
                : isLoading
                    ? <div>Loading users, please wait..</div> 
                    : <UserList users={currentUsers} />
            }

            <div className='pagination-container'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageCount={Math.ceil(users.length / USERS_PER_PAGE)}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}/>
            </div>
        </div>
    )
}

export default Home