const axios = require('axios');

export const getEvents = accessToken => {
	return {
		type: 'GET_EVENTS',
		payload: axios({
			method: 'get',
			url: 'api/events/getEvents',
			headers: {
				Authorization: accessToken
			}
		})
			.then(response => {
				return response.data
			})
			.catch(err => reject(err))
	}
}