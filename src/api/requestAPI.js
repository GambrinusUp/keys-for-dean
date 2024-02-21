import axios from "axios";

const API_URL = 'https://localhost:7167/api/';

function getRequests() {
    return axios.get(API_URL + "BidControl/pending")
        .then((response) => {
            console.log("token", response.data);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            if(error.code && error.code === "ERR_NETWORK")
                return {status: 418, errors: error.message};
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

function getActiveRequests() {
    return axios.get(API_URL + "BidControl/active")
        .then((response) => {
            console.log("token", response.data);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            if(error.code && error.code === "ERR_NETWORK")
                return {status: 418, errors: error.message};
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

function approveRequest(id) {
    return axios.put(API_URL + "BidControl/approve?id=" + id)
        .then((response) => {
            console.log("token", response);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            if(error.code && error.code === "ERR_NETWORK")
                return {status: 418, errors: error.message};
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

function denyRequest(id, message) {
    return axios.put(API_URL + "BidControl/deny?id=" + id + "&message=" + message)
        .then((response) => {
            console.log("token", response);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            if(error.code && error.code === "ERR_NETWORK")
                return {status: 418, errors: error.message};
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

export const requestAPI = {
    getRequests : getRequests,
    approveRequest : approveRequest,
    denyRequest : denyRequest,
    getActiveRequests : getActiveRequests
}