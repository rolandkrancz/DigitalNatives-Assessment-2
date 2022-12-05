import React, { useState } from 'react'
import UserForm from '../../components/UserForm/UserForm';

const AddUser = () => {

    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);

    const submitHandler = async (firstName, lastName) => {
        const newUser = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            status: "active"
        });

        fetch('https://assessment-users-backend.herokuapp.com/users',
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: newUser
        })
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
        <UserForm   submitHandler={submitHandler} 
                    firstNameError={firstNameError} 
                    lastNameError={lastNameError} />
    )
}

export default AddUser