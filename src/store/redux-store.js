import { createStore, combineReducers, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import requestsReducer from "./requestReducer";
import keysReducer from "./keysReducer";

let reducers = combineReducers({
    requestsReducer : requestsReducer,
    keysReducer : keysReducer
});

let store = createStore(reducers, composeWithDevTools(
    applyMiddleware(ThunkMiddleware)
));

export default store;