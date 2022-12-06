import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import UserList from '../../components/UserList/UserList';
import * as fetchRequests from '../../utils/fetchRequests';
import './Home.scss'

export const USERS_PER_PAGE = 10;

const Home = () => {

    const [users, setUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        setIsLoading(true);
        fetchUsers();
        setIsLoading(false);
    }, [])

    const fetchUsers = () => {
        fetchRequests.getAllUser()
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

    const updateUserStatus = (id, newStatus) => {
        fetchRequests.updateUserStatus(id, newStatus)
        .catch(err => {
            console.log(err);
            setError(`Could not update user ${id}'s status to ${newStatus}.`);
        });

        fetchUsers();
    }

    const handlePageClick = (event) => {
        const pageNumber = event.selected + 1;
        const indexOfLastDisplayedUser = pageNumber * USERS_PER_PAGE; 
        const indexOfFirstDisplayedUser = indexOfLastDisplayedUser - USERS_PER_PAGE;
        setCurrentUsers(users.slice(indexOfFirstDisplayedUser, indexOfLastDisplayedUser));
    }

    return (
        <div className='home-container'>
            {error 
                ? <h3>Error: {error}</h3>
                : isLoading
                    ? <div>Loading users, please wait..</div> 
                    : <UserList users={currentUsers} updateUserStatus={updateUserStatus} />
            }

            <div className='pagination-container'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageCount={Math.ceil(users.length / USERS_PER_PAGE)}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    activeClassName={'active'}
                    />
            </div>
        </div>
    )
}

export default Home