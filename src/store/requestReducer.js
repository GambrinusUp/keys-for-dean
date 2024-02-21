import {requestAPI} from "../api/requestAPI.js";

const LOAD_REQUEST = "LOAD_REQUEST";
const LOAD_APPROVED_REQUEST = "LOAD_APPROVED_REQUEST";
const SET_LOADING = "SET_LOADING";

let initialState = {
    requests : [],
    approvedRequests: [],
    isLoading: false
}

const requestsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_APPROVED_REQUEST:
            newState.approvedRequests = action.data.filter(item => item.bidStatus !== 0);
            return newState;
        case LOAD_REQUEST:
            newState.requests = action.data;
            return newState;
        case SET_LOADING:
            newState.isLoading = action.isLoading
            return newState;
        default:
            return newState;
    }
}

export function setLoadingActionCreator(isLoading) {
    return { type: SET_LOADING, isLoading };
}


export function getApprovedRequestsActionCreator(data) {
    return {type: LOAD_APPROVED_REQUEST, data: data}
}

export const getApprovedRequestsThunkCreator = () => (dispatch) => {
    dispatch(setLoadingActionCreator(true));

    return requestAPI.getActiveRequests().then(
        (data) => {
            if(data.status === 200) {
                dispatch(getApprovedRequestsActionCreator(data.data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    ).finally(() => {
        dispatch(setLoadingActionCreator(false));
    });
};

export function getRequestsActionCreator(data) {
    return {type: LOAD_REQUEST, data: data}
}

export const getRequestsThunkCreator = () => (dispatch) => {
    dispatch(setLoadingActionCreator(true));

    return requestAPI.getRequests().then(
        (data) => {
            if(data.status === 200) {
                dispatch(getRequestsActionCreator(data.data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    ).finally(() => {
        dispatch(setLoadingActionCreator(false));
    });
};

export default requestsReducer;