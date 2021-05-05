import {
    FETCH_ASSISTANCE_ERROR,
    FETCH_ASSISTANCE_PENDING,
    FETCH_ASSISTANCE_SUCCESS,
    SELECT_ASSISTANCE,
    SET_ASSISTANCE_ATTR,
    ADD_ASSISTANCE,
    SET_ASS_EMPTY
} from '../actions/assistanceAction';

const initialState = {
    pending: false,
    assistanceList: [],
    error: null,
    addingNew: false,
    empty: true,
    selectedAssistance: {
        "demographics": [],
        "description": "",
        "email": "",
        "id": "",
        "languages": [],
        "locations": [],
        "orgName": "",
        "phone": "",
        "pocName": null,
        "website": ""
    }
}

export default function assistance(state = initialState, action) {
    switch(action.type) {
        case FETCH_ASSISTANCE_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_ASSISTANCE_SUCCESS:
            return {
                ...state,
                pending: false,
                assistanceList: action.payload
            }
        case FETCH_ASSISTANCE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case SELECT_ASSISTANCE:
            return {
                ...state,
                selectedAssistance: action.payload,
                addingNew: false,
                empty: false
            }
        case ADD_ASSISTANCE:
            return {
                ...state,
                selectedAssistance: initialState.selectedAssistance,
                addingNew: true,
                empty: false
            }
        case SET_ASSISTANCE_ATTR:
            return {
                ...state,
                selectedAssistance: {
                    ...state.selectedAssistance,
                    [action.field]: action.value
                }
            }
        case SET_ASS_EMPTY:
            return {
                ...state,
                empty: action.payload
            }
        default: 
            return state
    }
}

export const getAssistance = state => state.assistance.assistanceList;
export const getAssistancePending = state => state.assistance.pending;
export const getAssistanceError = state => state.assistance.error;
export const getSelectedAssistance = state => state.assistance.selectedAssistance;
export const getAddingNew = state => state.assistance.addingNew;
export const getAssistanceEmpty = state => state.assistance.empty;
