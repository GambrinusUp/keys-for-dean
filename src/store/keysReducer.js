import {keysAPI} from "../api/keysAPI";

const LOAD_KEYS = "LOAD_KEYS";
const CLEAR_KEYS = "CLEAR_KEYS";
const SET_LOADING = "SET_LOADING";

let initialState = {
    keys : [],
    isLoading: false
}

const keysReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_KEYS:
            newState.keys = action.data;
            return newState;
        case CLEAR_KEYS:
            newState.keys = [];
            return newState;
        case SET_LOADING:
            newState.isLoading = action.isLoading
            return newState;
        default:
            return newState;
    }
}

export function getKeysActionCreator(data) {
    return {type: LOAD_KEYS, data: data}
}

export function clearKeysActionCreator() {
    return { type: CLEAR_KEYS };
}

export function setLoadingActionCreator(isLoading) {
    return { type: SET_LOADING, isLoading };
}

export const getKeysThunkCreator = (date, timeSlot) => (dispatch) => {
    dispatch(clearKeysActionCreator());
    dispatch(setLoadingActionCreator(true));

    return keysAPI.getKeys(date, timeSlot).then(
        (data) => {
            if(data.status === 200) {
                dispatch(getKeysActionCreator(data.data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    ).finally(() => {
        dispatch(setLoadingActionCreator(false));
    });
};

export default keysReducer;