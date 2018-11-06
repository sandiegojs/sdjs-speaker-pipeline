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
			console.log(payload);
			return {
				...state
			}
		}

		// case 'ADD_SPEAKER_FULFILLED': {
		// 	return {
		// 		...state,
		// 		speakerId: payload.id
		// 	}
		// }
		// case 'ADD_EVENT_FULFILLED': {
		// 	return {
		// 		...state,
		// 		eventId: payload.id
		// 	}
		// }
		// case 'ADD_TALK_FULFILLED': {
		// 	return {
		// 		...state,
		// 		talkId: payload.id
		// 	}
		// }
		// case 'ADD_EVENT_FULLFILLED': {
		// 	return {
		// 		...state,
		// 		eventId: payload.id
		// 	}
		// }
		default: {
			return state
		}
	}
}
