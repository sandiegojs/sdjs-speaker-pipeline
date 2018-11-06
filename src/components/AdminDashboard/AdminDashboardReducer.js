const initialstate = {
    talkInfo: [],
}

export default function AdminDashboardReducer(state = initialstate, action) {
    const { payload, type } = action;

    switch (type) {
        case 'GET_TALK_DATA_FULFILLED': {
            return {
                ...state,
                talkInfo: payload.pendingTalkInfo
            }
        }
        case 'UPDATE_TALK_STATUS_IN_STORE': {
            const updatedTalkInfo = state.talkInfo.map((talk) => {
                if (talk.talkId == payload.talkId) {
                    return {
                        ...talk,
                        status: payload.status
                    }
                }
                else {
                    return talk
                }
            })
            return {
                ...state,
                talkInfo: updatedTalkInfo
            }
        }
        case 'CHANGE_TALK_STATUS_IN_DB_FULFILLED': {
            const updatedTalkInfo = state.talkInfo.map((talk) => {
                if (talk.talkId == payload.id && payload.approved == true) {
                    return {
                        ...talk,
                        confirmationMessage: 'Success. The talk is now approved.'
                    }
                }
                if (talk.talkId == payload.id && payload.approved == false) {
                    return {
                        ...talk,
                        confirmationMessage: 'Success. The talk is now denied.'
                    }
                }
                else {
                    return talk
                }
            })
            return {
                ...state,
                talkInfo: updatedTalkInfo
            }
        }
        default: {
            return state
          }
    }
}

