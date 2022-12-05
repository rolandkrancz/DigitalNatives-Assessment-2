import React, { useState } from 'react'
import './UserForm.scss'

const UserForm = ({ submitHandler, firstNameError, lastNameError, firstNameDefault, lastNameDefault}) => {
    
    const [firstName, setFirstName] = useState(firstNameDefault);
    const [lastName, setLastName] = useState(lastNameDefault);

    const onFirstNameChange = e => {
        setFirstName(e.target.value);
    }

    const onLastNameChange = e => {
        setLastName(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        submitHandler(firstName, lastName);
    }
    
    return (
        <form className='user-form' onSubmit={onSubmit}>
            <label htmlFor='first-name'>First Name:</label>
            {firstNameError && (<p className='error' data-testid='fn-error'>{firstNameError}</p>)}
            <br/>
            <input id='first-name' name='first-name' type='text' value={firstName} onChange={onFirstNameChange} />
            <br/>
            <label htmlFor='last-name'>Last Name:</label>
            {lastNameError && (<p className='error' data-testid='ln-error'>{lastNameError}</p>)}
            <br/>
            <input id='last-name' name='last-name' type='text' value={lastName} onChange={onLastNameChange} />
            <br/>
            <button type='submit'>Submit</button>
        </form>)
}

export default UserForm