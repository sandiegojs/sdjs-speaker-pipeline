const axios = require('axios');

export const updateFirstname = (value) => ({
	type: 'UPDATE_FIRSTNAME',
	payload: value,
})

export const updateLastname = (value) => ({
	type: 'UPDATE_LASTNAME',
	payload: value,
})

export const updateEmail = (value) => ({
	type: 'UPDATE_EMAIL',
	payload: value,
})

export const updatePhone = (value) => ({
	type: 'UPDATE_PHONE',
	payload: value,
})

export const updateCompany = (value) => ({
	type: 'UPDATE_COMPANY',
	payload: value,
})

export const updateDate = (value) => ({
	type: 'UPDATE_DATE',
	payload: value,
})

export const updateTopic = (value) => ({
	type: 'UPDATE_TOPIC',
	payload: value,
})

export const updateDescription = (value) => ({
	type: 'UPDATE_DESCRIPTION',
	payload: value,
})

export const updateGithub = (value) => ({
	type: 'UPDATE_GITHUB',
	payload: value,
})

export const updateWebsite = (value) => ({
	type: 'UPDATE_WEBSITE',
	payload: value,
})

export const updateLinkedin = (value) => ({
	type: 'UPDATE_LINKEDIN',
	payload: value,
})

export const talkSubmit = (speakerInfo, talkInfo, date) => ({
	type: 'TALK_SUBMIT',
	payload: axios.post('api/talks/talkSubmit', {speakerInfo: speakerInfo, talkInfo: talkInfo, date: date})
})

export const getDates = () => ({
	type: 'GET_DATES',
	payload: axios.get('api/talks/getMeetups')
		.then(response => {
			return response.data
		})
})
