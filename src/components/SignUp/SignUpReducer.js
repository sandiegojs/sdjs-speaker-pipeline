const initialstate = {
	speakerFirstname: '',
	speakerLastname: '',
	speakerEmail: '',
	speakerPhone: '',
	speakerDate: '',
	speakerCompany: '',
	talkTopic: '',
	talkDescription: '',
	speakerGithub: '',
	speakerWebsite: '',
	speakerLinkedin: '',
	submitted: 'false'
}
export default function SignUpReducer(state = initialstate, action) {
	const { payload, type } = action;

	switch (type) {
		case 'UPDATE_FIRSTNAME': {
			return {
				...state,
				speakerFirstname: payload
			}
		}
		case 'UPDATE_LASTNAME': {
			return {
				...state,
				speakerLastname: payload
			}
		}
		case 'UPDATE_EMAIL': {
			return {
				...state,
				speakerEmail: payload
			}
		}
		case 'UPDATE_PHONE': {
			return {
				...state,
				speakerPhone: payload
			}
		}
		case 'UPDATE_COMPANY': {
			return {
				...state,
				speakerCompany: payload
			}
		}
		case 'UPDATE_DATE': {
			return {
				...state,
				speakerDate: payload
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
				talkDescription: payload
			}
		}
		case 'UPDATE_GITHUB': {
			return {
				...state,
				speakerGithub: payload
			}
		}
		case 'UPDATE_WEBSITE': {
			return {
				...state,
				speakerWebsite: payload
			}
		}
		case 'UPDATE_LINKEDIN': {
			return {
				...state,
				speakerLinkedin: payload
			}
		}
		case 'TALK_SUBMIT_FULFILLED': {
			return {
				...state,
				submitted: true
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
