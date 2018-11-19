const initialstate = {
	username: '',
	password: '',
	accessToken: '',
	authorized: false,
	remember: false
}

export default function AdminLoginReducer(state = initialstate, action) {
	const { payload, type } = action;


	switch (type) {
		case 'UPDATE_USERNAME': {
			return {
				...state,
				username: payload,
				accessToken: ''
			}
		}
		case 'UPDATE_PASSWORD': {
			return {
				...state,
				password: payload
			}
		}
		case 'REMEMBER_ME': {
			return {
				...state,
				remember: payload,
			}
		}
		case 'POST_LOGIN_REJECTED': {
			alert('Login failed')
			return {
				...state,
				username: '',
				password: '',
				accessToken: '',
				authorized: false
			}
		}
		case 'POST_LOGIN_FULFILLED': {
			if (payload.id) return {
				...state,
				username: '',
				password: '',
				accessToken: payload.id,
				authorized: true,
			};
			else {
				alert('Login failed');
				return {
					...state,
					username: '',
					password: '',
					authorized: false
				}
			}
		}
		case 'POST_LOGIN_PERSIST_REJECTED': {
			alert('Login failed');
			return {
				...state,
				username: '',
				password: '',
				authorized: false
			}
		}
		case 'POST_LOGIN_PERSIST_FULFILLED': {
			if (payload.id) return {
				...state,
				accessToken: payload.id,
				authorized: true,
			};
			else {
				alert('Login failed');
				return {
					...state,
					username: '',
					password: '',
					authorized: false,
				}
			}
        }
		case 'CHECK_TOKEN_FULFILLED': {
			if (payload.id) return {
				...state,
				authorized: true,
			};
			else return {
				...state,
				authorized: false,
			}
		}
		case 'CHECK_TOKEN_REJECTED': {
			return {
				...state,
				authorized: false,
			}
		}
		default: {
			return state;
		}
	}
}
