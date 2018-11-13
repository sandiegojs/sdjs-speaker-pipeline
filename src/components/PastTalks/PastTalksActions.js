const axios = require('axios')

export const getPastTalks = (accessToken) => ({
	type: 'GET_PAST_TALKS',
	payload: axios({
		method: 'get',
		url: 'api/talks/pastTalks',
		headers: {
			Authorization: accessToken
		}
	})
		.then(response => {
			console.log('response: ', response.data)
			return response.data
		})
})