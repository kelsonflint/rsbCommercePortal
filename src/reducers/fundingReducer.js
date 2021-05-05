import { 
    FETCH_FUNDING_PENDING,
    FETCH_FUNDING_SUCCESS,
    FETCH_FUNDING_ERROR,
    SELECT_FUNDING,
    SET_FUNDING_ATTR,
    ADD_FUNDING,
    SET_EMPTY 
} from '../actions/fundingAction';

const initialState = {
    pending: false,
    fundingList: [],
    error: null,
    addingNew: false,
    empty: true,
    selectedFunding: {
        "NAICS": [],
        "demographics": [],
        "description": "",
        "endDate": "",
        "fundingName": "",
        "fundingType": "",
        "id": "",
        "nonprofit": false,
        "provider": "",
        "startDate": "",
        "terms": [],
        "useCases": [],
        "uses": [],
        "website": ""
    }
}

export default function funding(state = initialState, action) {
    switch (action.type) {
        case FETCH_FUNDING_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_FUNDING_SUCCESS: 
            return {
                ...state,
                pending: false,
                fundingList: action.payload
            }
        case FETCH_FUNDING_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case SELECT_FUNDING:
            return {
                ...state,
                selectedFunding: action.payload,
                addingNew: false,
                empty: false
            }
        case ADD_FUNDING:
            return {
                ...state,
                selectedFunding: initialState.selectedFunding,
                addingNew: true,
                empty: false
            }
        case SET_FUNDING_ATTR:
            return {
                ...state,
                selectedFunding: {
                    ...state.selectedFunding,
                    [action.field]: action.value
                }
            }
        case SET_EMPTY:
            return {
                ...state,
                empty: action.payload
            }
        default:
            return state
    }
}


export const getFunding = state => state.funding.fundingList;
export const getFundingPending = state => state.funding.pending;
export const getFundingError = state => state.funding.error;
export const getSelectedFunding = state => state.funding.selectedFunding;
export const getAddingNew = state => state.funding.addingNew;
export const getFundingEmpty = state => state.funding.empty;

