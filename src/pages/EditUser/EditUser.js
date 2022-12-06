import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserForm from '../../components/UserForm/UserForm';
import * as fetchRequests from '../../utils/fetchRequests';

const EditUser = () => {
    const uid = useParams().uid;
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const nav = useNavigate();

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

        try {
            const response = await fetchRequests.updateUser(uid, updatedUser);
            if(!response.ok){
                const responseData = await response.json();
                handleErrors(responseData);
            } else {
                console.log(`User ${uid} updated succesfully!`);
                nav('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleErrors = (errorData) => {
        const fnError = errorData['first_name'] ? errorData['first_name'] : null;
        const lnError = errorData['last_name'] ? errorData['last_name'] : null;
        setFirstNameError(fnError);
        setLastNameError(lnError);
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