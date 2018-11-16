import axios from 'axios';

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
			return response.data
		})
})