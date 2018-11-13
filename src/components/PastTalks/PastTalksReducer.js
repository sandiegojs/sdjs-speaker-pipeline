const initialstate = {
    pastTalks: []
}

export default function PastTalkReducer(state = initialstate, action) {
    const { payload, type } = action; 

    switch(type) {
        case 'GET_PAST_TALKS_FULFILLED': {
            return {
                ...state,
                pastTalks: payload
            }
        }
        default: {
            return state
        }
    }
}