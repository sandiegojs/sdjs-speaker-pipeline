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
			console.log(response.data)
			return response.data
		})
})

// export const addSpeaker = (speakerInfo) => ({
// 	type: 'ADD_SPEAKER',
// 	payload: axios.post('api/speakers', speakerInfo)
// 		.then(response => {
// 			console.log(response.data)
// 			return response.data
// 		})
// 		.catch(err => console.log('Unable to submit speaker', err))
// })

// export const addEvent = (date) => ({
// 	type: 'ADD_EVENT_TALK',
// 	payload: axios.get('api/talks/getMeetups')
// 		.then(response => {
// 			const index = response.data.findIndex((item) => {
// 				return item.date == date
// 			})
// 			console.log(response.data[index].name, response.data[index].description)
// 			let name = response.data[index].name;
// 			let details = response.data[index].description;
// 			return axios.post('api/events',{date, name, details})
// 				.then(response2 => {
// 					console.log(response2.data)
// 					return response2.data
// 				})
// 				.catch(err => console.log('Unable to create event', err))
// 		})
// 		.catch(err => console.log('Unable to get event info', err))
// })

// export const addTalk = (talkInfo) => ({
// 	type: 'ADD_TALK',
// 	payload: axios.post('api/talks', talkInfo)
// 		.then(response => {
// 			console.log(response.data)
// 			return response.data
// 		})
// })