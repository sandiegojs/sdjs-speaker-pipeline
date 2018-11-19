import axios from 'axios';

export const postLogout = (accessToken) => {
    return {
        type: 'POST_LOGOUT',
        payload: axios({
            method: 'post',
            url: 'api/organizers/logout',
            headers: {
                Authorization: accessToken
            }
        })
        .then(response => {
            return response.data
        })
    }
}