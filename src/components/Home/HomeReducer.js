const initialstate = {
    newSpeaker: true,
}

export default function HomedReducer(state = initialstate, action) {
    const { payload, type } = action;

    switch (type) {
        case 'UPDATE_NEW_SPEAKER': {
            return {
                ...state,
                newSpeaker: payload
            }
        }
        default: {
            return state
		}
    }
}