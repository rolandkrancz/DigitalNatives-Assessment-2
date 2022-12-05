import { response } from 'msw';
import React, { useState } from 'react'

const AddUser = () => {
    const defaultInputState = {
        first_name: '',
        last_name: '',
        status: 'active'
    };

    const [inputs, setInputs] = useState(defaultInputState);
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);

    const inputHandler = (e) => {
        if(e.target.id === 'first-name') {
            let newInputs = inputs;
            newInputs.first_name = e.target.value;
            setInputs(inputs);
            setFirstNameError(null);
        }
        else if(e.target.id === 'last-name') {
            let newInputs = inputs;
            newInputs.last_name = e.target.value;
            setInputs(inputs);
            setLastNameError(null);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = JSON.stringify(inputs);

        fetch('https://assessment-users-backend.herokuapp.com/users',
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: newUser
        })
        .then(response => {
            if(response.ok) {
                resetInputs();
            } else {
                return response.json()
            }
        })
        .then(errorData => {
                if(errorData['first_name']) {
                    setFirstNameError(errorData['first_name']);
                }
                if(errorData['last_name']) {
                    setLastNameError(errorData['last_name']);
                }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const resetInputs = () => {
        setInputs(defaultInputState);
    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor='first-name'>First Name:</label>
            {firstNameError && (<p data-testid='fn-error'>{firstNameError}</p>)}
            <br/>
            <input id='first-name' name='first-name' type='text' onChange={inputHandler} />
            <br/>
            <label htmlFor='last-name'>Last Name:</label>
            {lastNameError && (<p data-testid='ln-error'>{lastNameError}</p>)}
            <br/>
            <input id='last-name' name='last-name' type='text' onChange={inputHandler} />
            <br/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default AddUser