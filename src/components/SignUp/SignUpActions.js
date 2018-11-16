import axios from 'axios';

export const talkSubmit = (speakerInfo, talkInfo, date) => ({
	type: 'TALK_SUBMIT',
	payload: axios.post('api/talks/talkSubmit', {speakerInfo: speakerInfo, talkInfo: talkInfo, date: date})
})

export const updateSpeakerName = (value) => ({
	type: 'UPDATE_NAME',
	payload: value,
})
 export const updateDate = (value) => ({
	type: 'UPDATE_DATE',
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
 export const updateTopic = (value) => ({
	type: 'UPDATE_TOPIC',
	payload: value,
})
 export const updateDescription = (value) => ({
	type: 'UPDATE_DESCRIPTION',
	payload: value,
})
export const getDates = () => ({
	type: 'GET_DATES',
	payload: axios.get('api/talks/getMeetups')
	.then(response => {
		return response.data
	})
	.catch(err => err)
})
