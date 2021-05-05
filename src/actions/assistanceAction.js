export const FETCH_ASSISTANCE_SUCCESS = 'FETCH_ASSISTANCE_SUCCESS';
export const FETCH_ASSISTANCE_PENDING = 'FETCH_ASSISTANCE_PENDING';
export const FETCH_ASSISTANCE_ERROR = 'FETCH_ASSISTANCE_ERROR';
export const SELECT_ASSISTANCE = 'SELECT_ASSISTANCE';
export const SET_ASSISTANCE_ATTR = 'SET_ASSISTANCE_ATTR';
export const ADD_ASSISTANCE = 'ADD_ASSISTANCE';
export const SET_ASS_EMPTY = 'SET_ASS_EMPTY';

export function fetchAssistanceSuccess(assistanceList) {
    return {
        type: FETCH_ASSISTANCE_SUCCESS,
        payload: assistanceList
    }
}

export function fetchAssistancePending() {
    return {
        type: FETCH_ASSISTANCE_PENDING
    }
}

export function fetchAssistanceError(error) {
    return {
        type: FETCH_ASSISTANCE_ERROR,
        error: error
    }
}

export function setSelectedAssistance(assistanceItem) {
    return {
        type: SELECT_ASSISTANCE,
        payload: assistanceItem
    }
}

export function setAssistanceAttr(field, value) {
    return {
        type: SET_ASSISTANCE_ATTR,
        field: field,
        value: value
    }
}

export function addAssistance() {
    return {
        type: ADD_ASSISTANCE
    }
}

export function setAssEmpty(e) {
    return {
        type: SET_ASS_EMPTY,
        payload: e
    }
}