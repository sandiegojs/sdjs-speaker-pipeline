const initialstate = {
    selectedOwner: ''
}

export default function TalksPageReducer(state = initialstate, action) {
    const { payload, type } = action;

    switch (type) {
        case 'UPDATE_OWNER_FILTER_IN_STORE': {
            return {
                ...state,
                selectedOwner: payload,
            }
        }
        default: {
            return state
          }
    }
}
