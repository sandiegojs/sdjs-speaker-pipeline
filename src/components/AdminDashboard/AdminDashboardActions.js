const axios = require('axios');

export const getTalkData = () => {
    return {
        type: 'GET_TALK_DATA',
        payload: axios.get('api/talks/getPendingTalkDetails')
        .then(pendingTalkInfo => {
            const talkIds = pendingTalkInfo.data.map(talk => talk.talkId)
            return {
                pendingTalkInfo: pendingTalkInfo.data,
                talkIds: talkIds
            }
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

export const changeTalkStatus = (talkId, status) => {
    return {
        type: 'CHANGE_TALK_STATUS_IN_DB',
        payload: axios.put('api/talks/changeTalkStatus', {
            talkId,
            status
          })
          .then((updatedTalk) => updatedTalk.data)
    }
}
