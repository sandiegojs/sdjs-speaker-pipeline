const axios = require('axios');

export const getTalkData = () => {
    return {
        type: 'GET_TALK_DATA',
        payload: axios.get('api/talks?filter[where][pending]=true')
        .then(response => {
            return response.data
        })
    }
}

export const getSpeakerData = () => {
    return {
        type: 'GET_SPEAKER_DATA',
        payload: axios.get('api/speakers')
        .then(response => {
            return response.data
        })
    }
}

export const getEventData = () => {
    return {
        type: 'GET_EVENT_DATA',
        payload: axios.get('api/events')
        .then(response => {
            return response.data
        })
    }
}

export const handleRadioChange = (talkId, status) => {
    return {
        type: 'UPDATE_TALK_STATUS_IN_STORE',
        payload: {
            talkId,
            status
        }
    }
}

export const approveTalkStatus = (talkId) => {
    return {
        type: 'APPROVE_TALK_STATUS_IN_DB',
        payload: axios.patch(`api/talks/${talkId}`, {
            "pending": false,
            "approved": true
          })
          .then((response) => response.data.id)
    }
}

export const denyTalkStatus = (talkId) => {
    return {
        type: 'DENY_TALK_STATUS_IN_DB',
        payload: axios.patch(`api/talks/${talkId}`, {
            "pending": false,
            "approved": false
          })
          .then((response) => response.data.id)
    }
}