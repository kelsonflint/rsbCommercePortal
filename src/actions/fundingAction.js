export const FETCH_FUNDING_SUCCESS = 'FETCH_FUNDING_SUCCESS';
export const FETCH_FUNDING_PENDING = 'FETCH_FUNDING_PENDING';
export const FETCH_FUNDING_ERROR = 'FETCH_FUNDING_ERROR';
export const SELECT_FUNDING = 'SELECT_FUNDING';
export const SET_FUNDING_ATTR = 'SET_FUNDING_ATTR';
export const ADD_FUNDING = "ADD_FUNDING";
export const SET_EMPTY = 'SET_EMPTY';


export function fetchFundingSuccess(fundingList) {
    return {
        type: FETCH_FUNDING_SUCCESS,
        payload: fundingList
    }
}

export function fetchFundingPending() {
    return {
        type: FETCH_FUNDING_PENDING
    }
}

export function fetchFundingError(error) {
    return {
        type: FETCH_FUNDING_ERROR,
        error: error
    }
}

export function setSelectedFunding(fundingItem) {
    return {
        type: SELECT_FUNDING,
        payload: fundingItem
    }
}

export function setFundingAttr(field, value) {
    return {
        type: SET_FUNDING_ATTR,
        field: field,
        value: value
    }
}

export function addFunding() {
    return {
        type: ADD_FUNDING
    }
}

export function setEmpty(e) {
    return {
        type: SET_EMPTY,
        payload: e
    }
}