import axios from 'axios';
import moment from 'moment'

export const getPastTalks = accessToken => {
    return {
        type: 'GET_PAST_TALKS',
        payload: axios({
            method: 'get',
            url: 'api/talks/getTalkDetails',
            headers: {
                Authorization: accessToken
            }
        })
            .then(talkInfo => {
				(talkInfo.data)
				const date = moment().format()
				const filtered = talkInfo.data.filter(talk => 
					(talk.currentStatus == 'Approve' || talk.currentStatus == 'Confirmed')  && moment(talk.eventDate).format() < date
				)
				filtered.sort(function(a, b) {
					a = moment(a.eventDate).format();
					b = moment(b.eventDate).format();
					return a>b ? -1 : a<b ? 1 : 0;
				})
				return filtered
            })
    }
}
