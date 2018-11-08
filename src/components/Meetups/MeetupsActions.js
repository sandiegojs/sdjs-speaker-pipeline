const axios = require('axios');

export const getEvents = () => {
	return {
		type: 'GET_EVENTS',
		payload: axios.get('api/events/getEvents')
			.then(response => {
				console.log(response.data)
				return response.data
			})
			.catch(err => console.log(err))
	}
}