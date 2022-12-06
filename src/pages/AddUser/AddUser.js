import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/UserForm/UserForm';
import * as fetchRequests from '../../utils/fetchRequests';

const AddUser = () => {
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);
    const nav = useNavigate();

    const submitHandler = async (firstName, lastName) => {
        const newUser = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            status: "active"
        });

        try {
            const response = await fetchRequests.createUser(newUser)
            const responseData = await response.json();
            if(!response.ok){
                handleErrors(responseData);
            } else {
                console.log('User created succesfully with id: ' + responseData.id);
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
        <UserForm   submitHandler={submitHandler} 
                    firstNameError={firstNameError} 
                    lastNameError={lastNameError} />
    )
}

export default AddUser