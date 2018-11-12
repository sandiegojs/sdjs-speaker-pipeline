const axios = require('axios');
import Talks from './Talks'

export const getTalkData = accessToken => {
	return {
		type: 'GET_TALK_DATA',
		payload: axios({
            method: 'get',
            url: 'api/talks/getTalkDetails',
            headers: {
                Authorization: accessToken
            }
        })
			.then(talkInfo => {
				const talkIds = talkInfo.data.map(talk => talk.talkId)
				console.log('talkInfo: ', talkInfo.data)
				return {
					talkInfo: talkInfo.data,
					talkIds: talkIds
				}
			})
	}
}

export const handleSelect = (talkId, selectedStatus) => {
    return {
        type: 'UPDATE_TALK_STATUS_IN_STORE',
        payload: {
            talkId,
            selectedStatus
        }
    }
}

export const changeTalkStatus = (talkId, selectedStatus, accessToken) => {
    return {
        type: 'CHANGE_TALK_STATUS_IN_DB',
        payload: axios({
            method: 'put',
            url: 'api/talks/changeTalkStatus',
            headers: {
                Authorization: accessToken
            },
            data: {
                talkId,
                selectedStatus
            }
        })
          .then((updatedTalk) => updatedTalk.data)
    }
}


