import {fetchAssistanceSuccess, fetchAssistancePending, fetchAssistanceError, setAssEmpty} from '../actions/assistanceAction';
import ShortUniqueId from 'short-unique-id'

export function fetchAssistance() {
    return dispatch => {
        dispatch(fetchAssistancePending());
        // fetch('https://8tb0tsfjg2.execute-api.us-west-2.amazonaws.com/rsb/assistance')
        fetch("http://localhost:5000/assistance")
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                throw(res.error);
            }
            dispatch(fetchAssistanceSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchAssistanceError(error));
        })
    }
}

export function updateAssistance(a) {
    console.log("updating")
    return dispatch => {
        const url = "http://localhost:5000/assistance/" + a.id; 
        const options = {
            method: 'PUT',
            body: JSON.stringify(a),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => {
            console.log(error);
        })
    }
}

export function addNewAssistance(a) {
    console.log("adding new Assistance")
    let id = new ShortUniqueId();
    a.id = id();
    return dispatch => {
        const url = "http://localhost:5000/assistance"
        const options = {
            method: 'POST',
            body: JSON.stringify(a),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => {
            console.log(error);
        })
        dispatch(setAssEmpty(true));
    }
}

export function deleteAssistance(a) {
    console.log("deleting assistance", a.id);
    return dispatch => {
        const url = "http://localhost:5000/assistance/" + a.id
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => {
            console.log(error);
        })
        dispatch(setAssEmpty(true));
    }
}
