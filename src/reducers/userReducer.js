import {
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    SET_USER_CREDENTIALS
} from '../actions/userAction';


const initialState = {
    credentials: {
        email: "",
        password: ""
    },
    user: {
        firstName: "",
        lastName: "", 
        email: "",
        id: ""
    },
    token: "",
    loggedIn: false,
    error: ""
}

export default function user(state = initialState, action) {
    switch(action.type) {
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                token: action.token,
                loggedIn: true,
                error: ""
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
                error: action.error
            };
        case SET_USER_CREDENTIALS:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    [action.field]: action.value
                }
            }
        default:
            return state;
    }
}

export const getUser = state => state.user.user;
export const getUserToken = state => state.user.token;
export const getUserError = state => state.user.error;
export const getUserLoggedIn = state => state.user.loggedIn;
export const getUserCredentials = state => state.user.credentials;