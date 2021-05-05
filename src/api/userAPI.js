import {fetchUserError, fetchUserSuccess} from '../actions/userAction';

export function login(email, pass) {
    return dispatch => {
        //'https://8tb0tsfjg2.execute-api.us-west-2.amazonaws.com/rsb/login')
        const url = "http://localhost:5000/login"
        const options = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: pass
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if ("error" in res) {
                console.log(res)
                dispatch(fetchUserError(res.error))
            } else {
                console.log(res)
                dispatch(fetchUserSuccess(res))
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export function createUser(u) {
    return dispatch => {
        //'https://8tb0tsfjg2.execute-api.us-west-2.amazonaws.com/rsb/users
        const url = "http://localhost:5000/users"
        const options = {
            method: 'POST',
            body: JSON.stringify({
                email: u.email,
                password: u.pass,
                firstName: u.firstName,
                lastName: u.lastName,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .then(res => {
            if ("error" in res) {
                console.log(res)
                dispatch(fetchUserError(res.error))
            } else {
                console.log(res)
                dispatch(fetchUserSuccess(res))
            }
        })
        .catch(error => {
            console.log(error);
        })

    }
}