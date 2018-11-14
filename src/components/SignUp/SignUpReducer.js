const initialstate = {
	speakerName: '',
	speakerEmail: '',
	date: '',
	topic: '',
	description: '',
	submitted: 'false',
	phone: '',
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
			return {
				...state,
				date: payload
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
		case 'GET_DATES_FULFILLED': {
			return {
				...state,
				events: payload
			}
		}
		default: {
			return state
		}
	}
}
