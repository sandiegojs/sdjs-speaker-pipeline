const initialstate = {
    talkInfo: [],
    eventInfo: [],
}

export default function TalksReducer(state = initialstate, action) {
    const { payload, type } = action;

    switch (type) {
        case 'GET_TALK_DATA_FULFILLED': {
            return {
                ...state,
                talkInfo: payload.talkInfo
            }
        }
        case 'UPDATE_TALK_STATUS_IN_STORE': {
            const updatedTalkInfo = state.talkInfo.map((talk) => {
                if (talk.talkId == payload.talkId) {
                    return {
                        ...talk,
                        selectedStatus: payload.selectedStatus
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
                if (talk.talkId == payload.id) {
                    return {
                        ...talk,
                        currentStatus: payload.status,
                        confirmationMessage: `Success. The talk status is now '${payload.status}'.`
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

