const axios = require('axios');

export const decrypt = (token, accessToken ) => {
	return {
		type: 'DECRYPT',
		payload: axios({
			method: 'get',
			url: 'api/talk/changeTalkStatus',
			data: {
                talkId: id,
                status: status
			},
			headers: {
				Authorization: accessToken
			}
		})
	}
}
export const changeTalkStatus = (talkId, selectedStatus, accessToken) => {
    return {
        type: 'TALK_CONFIRM/CANCEL',
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
            .then((updatedTalk) => {
                return {
                    data: updatedTalk.data,
                    toggle: !toggle
                }
            })
    }
}