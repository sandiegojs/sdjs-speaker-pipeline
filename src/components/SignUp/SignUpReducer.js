const initialstate = {
	date: '',
	description: '',
	phone: '',
	speakerEmail: '',
	speakerName: '',
	submitted: false,
	talkTopic: '',
}
export default function SignUpReducer(state = initialstate, action) {
	const { payload, type } = action;

	switch (type) {
		case 'UPDATE_NAME': {
			return {
				...state,
				speakerName: payload
			}
		}
		case 'UPDATE_EMAIL': {
			return {
				...state,
				speakerEmail: payload
			}
		}
		case 'UPDATE_DATE': {
			const date = payload.slice(0, 10)
			return {
				...state,
				date: date
			}
		}
		case 'UPDATE_PHONE': {
			return {
				...state,
				phone: payload
			}
		}
		case 'UPDATE_TOPIC': {
			return {
				...state,
				talkTopic: payload
			}
		}
		case 'UPDATE_DESCRIPTION': {
			return {
				...state,
				description: payload
			}
		}
		case 'TALK_SUBMIT_FULFILLED': {
			return {
				...state,
				submitted: true,
				speakerName: '',
				speakerEmail: '',
				description: '',
				phone: '',
				talkTopic: '',
				date:'',

			}
		}
		case 'GET_DATES_FULFILLED': {
			return {
				...state,
				events: payload
			}
		}
		case 'RESET_SUBMITTED': {
			return{
				...state,
				submitted: false
			}
		}
		default: {
			return state
		}
	}
}
