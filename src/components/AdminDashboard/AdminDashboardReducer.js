const initialstate = {
    talks: [],
    speakers: [],
    events: [],
    status: []
}

export default function AdminDashboardReducer(state = initialstate, action) {
    const { payload, type } = action;

    switch (type) {
        case 'GET_TALK_DATA_FULFILLED': {
            let statusObj = payload.map((talk) => {
                return {
                    talkId: talk.id,
                    status: undefined,
                    confirmationMessage: undefined
                }
            })
            return {
                ...state,
                talks: payload,
                status: statusObj
            }
        }
        case 'GET_SPEAKER_DATA_FULFILLED': {
            return {
                ...state,
                speakers: payload
            }
        }
        case 'GET_EVENT_DATA_FULFILLED': {
            return {
                ...state,
                events: payload
            }
        }
        case 'UPDATE_TALK_STATUS_IN_STORE': {
            const updatedStatus = state.status.map((statusObj) => {
                if (statusObj.talkId == payload.talkId) {
                    return {
                        talkId: payload.talkId,
                        status: payload.status
                    }
                }
                else {
                    return statusObj
                }
            })
            return {
                ...state,
                status: updatedStatus
            }
        }
        case 'APPROVE_TALK_STATUS_IN_DB_FULFILLED': {
            const updatedStatus = state.status.map((statusObj) => {
                if (statusObj.talkId == payload) {
                    return {
                        talkId: statusObj.talkId,
                        status: statusObj.status,
                        confirmationMessage: 'Success. The talk is now approved.'
                    }
                }
                else {
                    return statusObj
                }
            })
            return {
                ...state,
                status: updatedStatus
            }
        }
        case 'DENY_TALK_STATUS_IN_DB_FULFILLED': {
            const updatedStatus = state.status.map((statusObj) => {
                if (statusObj.talkId == payload) {
                    return {
                        talkId: statusObj.talkId,
                        status: statusObj.status,
                        confirmationMessage: 'Success. The talk is now denied.'
                    }
                }
                else {
                    return statusObj
                }
            })
            return {
                ...state,
                status: updatedStatus
            }
        }
        default: {
            return state
          }
    }
}

