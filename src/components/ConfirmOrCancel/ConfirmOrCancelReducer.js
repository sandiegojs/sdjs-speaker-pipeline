const initialstate = {
  eventId: '',
  speakerToken: '',
  confirmed: false,
};

export default function OrganizersReducer(state = initialstate, action) {
  const { payload, type } = action;

  switch (type) {
    case 'HANDLE_SPEAKER_TOKEN': {
      return {
        ...state,
        speakerToken: payload,
      };
    }
    case 'HANDLE_TALK_ID': {
      return {
        ...state,
        eventId: payload,
      };
    }
    case 'SUBMIT_STATUS_FULFILLED': {
      return {
        ...state,
        confirmed: true,
      };
    }
    default: {
      return state;
    }
  }
}
