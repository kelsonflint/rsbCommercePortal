export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const SET_USER_CREDENTIALS = 'SET_USER_CREDENTIALS';


export function fetchUserSuccess(u) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: {
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            id: u.id
        },
        token: u.token
    }
}

export function fetchUserError(e) {
    return {
        type: FETCH_USER_ERROR,
        error: e
    }
}

export function setUserCredentials(field, value) {
    return {
        type: SET_USER_CREDENTIALS,
        field: field,
        value: value
    }
}