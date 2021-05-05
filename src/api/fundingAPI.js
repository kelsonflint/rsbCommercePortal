import {fetchFundingSuccess, fetchFundingPending, fetchFundingError, setEmpty } from '../actions/fundingAction';
import { getSelectedFunding } from '../reducers/fundingReducer';
import ShortUniqueId from 'short-unique-id';

export function fetchFunding() {
    return dispatch => {
        dispatch(fetchFundingPending());
       // fetch('https://8tb0tsfjg2.execute-api.us-west-2.amazonaws.com/rsb/funding')
        fetch("http://localhost:5000/funding")
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            //console.log(res)
            dispatch(fetchFundingSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchFundingError(error));
        })
    }
}

export function updateFunding(f) {
    console.log("updating")
    return dispatch => {
        const url = "http://localhost:5000/funding/" + f.id; 
        const options = {
            method: 'PUT',
            body: JSON.stringify(f),
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

export function addNewFunding(f) {
    console.log("adding new Funding")
    let id = new ShortUniqueId();
    f.id = id();
    return dispatch => {
        const url = "http://localhost:5000/funding"
        const options = {
            method: 'POST',
            body: JSON.stringify(f),
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
        dispatch(setEmpty(true))
    }
}

export function deleteFunding(f) {
    console.log("deleting funding", f.id);
    return dispatch => {
        const url = "http://localhost:5000/funding/" + f.id
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
        dispatch(setEmpty(true))
    }
}
