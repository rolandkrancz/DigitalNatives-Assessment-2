const BACKEND_URL = 'https://assessment-users-backend.herokuapp.com/users/';
const HEADERS = { 'Content-Type': 'application/json' };

export const getAllUser = () => {
    return fetch(BACKEND_URL, { headers: HEADERS })
}

export const getUserById = (id) => {
    return fetch(BACKEND_URL + id, { headers: HEADERS });
}

export const updateUser = (id, user) => {
    return fetch(BACKEND_URL + id, { method: 'PUT',
                                     headers: HEADERS,
                                     body: user
    })
}

export const updateUserStatus = (id, newStatus) => {
    return fetch(BACKEND_URL + id, { method: 'PUT',
                                     headers: HEADERS,
                                     body: JSON.stringify({ status: newStatus })})
}

export const createUser = (user) => {
    return fetch(BACKEND_URL,{ method: 'POST',
                               headers: HEADERS,
                               body: user
    })
}