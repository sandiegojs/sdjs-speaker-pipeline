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
        //filter by date order try this one second
            .then(talkInfo => {
				console.log(talkInfo.data)
				const date = moment('2019-03-14').format()
				const filtered = talkInfo.data.filter(talk => 
					talk.currentStatus == 'Approve' && moment(talk.eventDate).format() < date
				)
				console.log('filtered: ', filtered)
				filtered.sort(function(a, b) {
					a = moment(a.eventDate).format();
					b = moment(b.eventDate).format();
					return a>b ? -1 : a<b ? 1 : 0;
				})
				return filtered
            })
    }
}

// export const getPastTalks = (accessToken) => ({
// 	type: 'GET_PAST_TALKS',
// 	payload: axios({
// 		method: 'get',
// 		url: 'api/talks/pastTalks',
// 		headers: {
// 			Authorization: accessToken
// 		}
// 	})
// 		.then(response => {
// 			return response.data
// 		})
// })