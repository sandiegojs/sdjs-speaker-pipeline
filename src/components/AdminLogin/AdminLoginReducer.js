const initialstate = {
	username: '',
	password: '',
	token: '',
	userId: '',
}

export default function AdminLoginReducer(state = initialstate, action) {
	const { payload, type } = action;


	switch (type) {
		case 'UPDATE_USERNAME': {
			return {
				...state,
				username: payload
			}
		}
		case 'UPDATE_PASSWORD': {
			return {
				...state,
				password: payload
			}
		}
		case 'POST_LOGIN_REJECTED': {
			alert('Login failed')
			return {
				...state,
				username: '',
				password: '',
			}
		}

		case 'POST_LOGIN_FULFILLED': {
			return {
				...state,
				token: payload.id,
				userId: payload.userId
			}
		}
		default: {
			return state
		}
	}
}
