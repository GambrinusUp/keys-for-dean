import axios from "axios";

const API_URL = 'https://localhost:7167/api/';

function getKeys(date, timeSlot) {
    return axios.get(API_URL + "Key/byTimeslot?date=" + date + "&timeSlot=" + timeSlot + "&page=1&size=200")
        .then((response) => {
            console.log("token", response.data);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            if(error.code && error.code === "ERR_NETWORK")
                return {status: 418, errors: error.message};
            return {status: error.status, errors: error.response.errors};
        });
}

export const keysAPI = {
    getKeys : getKeys
}