import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserForm from '../../components/UserForm/UserForm';
import * as fetchRequests from '../../utils/fetchRequests';

const EditUser = () => {
    const uid = useParams().uid;
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);

    useEffect( () => {
        const fetchUser = async () => {
            fetchRequests.getUserById(uid)
            .then(response => response.json())
            .then(user => {
                setUser(user);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        setIsLoading(true);
        fetchUser();
        setIsLoading(false);
    }, [uid])

    const submitHandler = async (firstName, lastName) => {
        const updatedUser = JSON.stringify({
            first_name: firstName,
            last_name: lastName
        });

        fetchRequests.updateUser(uid, updatedUser)
        .then(response => response.json())
        .then(responseData => {
                if(responseData['first_name']) {
                    setFirstNameError(responseData['first_name']);
                } else {
                    setFirstNameError(null);
                }
                if(responseData['last_name']) {
                    setLastNameError(responseData['last_name']);
                } else {
                    setLastNameError(null);
                }
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <>
        {(!isLoading && user)
        ? <UserForm submitHandler={submitHandler} 
                    firstNameError={firstNameError} 
                    lastNameError={lastNameError}
                    firstNameDefault={user.first_name}
                    lastNameDefault={user.last_name}
                    />
         : <p>Loading, please wait..</p>}
        </>
    )
}

export default EditUser