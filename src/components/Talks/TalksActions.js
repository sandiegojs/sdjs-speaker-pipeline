const axios = require('axios');
import Talks from './Talks'

export const getTalkData = () => {
	return {
		type: 'GET_TALK_DATA',
		payload: axios.get('api/talks/getPendingTalkDetails')
			.then(pendingTalkInfo => {
				const talkIds = pendingTalkInfo.data.map(talk => talk.talkId)
				//console.log('pendingTalkInfo: ', pendingTalkInfo.data)
				return {
					pendingTalkInfo: pendingTalkInfo.data,
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

export const changeTalkStatus = (talkId, selectedStatus) => {
    return {
        type: 'CHANGE_TALK_STATUS_IN_DB',
        payload: axios.put('api/talks/changeTalkStatus', {
            talkId,
            selectedStatus
          })
          .then((updatedTalk) => updatedTalk.data)
    }
}


