import axios from 'axios';

export const getEvents = accessToken => {
	return {
		type: 'GET_EVENTS',
		payload: axios({
			method: 'get',
			url: 'api/talks/getMeetups',
			headers: {
				Authorization: accessToken
			}
		})
			.then(response => {
				return response.data
			})
			.catch(err => err)
	}
}