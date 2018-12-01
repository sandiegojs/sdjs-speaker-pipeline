import axios from 'axios';
import moment from 'moment';

export const getTalkData = accessToken => ({
  type: 'GET_TALK_DATA',
  payload: axios({
    method: 'get',
    url: 'api/talks/getTalkDetails',
    headers: {
      Authorization: accessToken,
    },
  }).then((talkInfo) => {
    const date = moment()
      .subtract(1, 'day')
      .format();
    const filtered = talkInfo.data.filter(
      talk => moment(talk.eventDate).format() > date,
    );
    filtered.sort((a, b) => {
      const c = moment(a.eventDate).format();
      const d = moment(b.eventDate).format();
      if (c > d) {
        return -1;
      } if (c < d) { return 1; }
      return 0;
    });
    return axios({
      method: 'get',
      url: 'api/organizers',
      headers: {
        Authorization: accessToken,
      },
    }).then(organizers => ({
      talkInfo: filtered,
      organizers: organizers.data,
    }));
  }),
});


export const handleSelectStatus = (talkId, selectedStatus) => ({
  type: 'UPDATE_TALK_STATUS_IN_STORE',
  payload: {
    talkId,
    selectedStatus,
  },
});

export const handleSelectOwner = (talkId, selectedOwner) => ({
  type: 'UPDATE_TALK_OWNER_IN_STORE',
  payload: {
    talkId,
    selectedOwner,
  },
});

export const changeTalkStatus = (
  talkId,
  selectedStatus,
  toggle,
  accessToken,
) => ({
  type: 'CHANGE_TALK_STATUS_IN_DB',
  payload: axios({
    method: 'put',
    url: 'api/talks/changeTalkStatus',
    headers: {
      Authorization: accessToken,
    },
    data: {
      talkId,
      selectedStatus,
    },
  }).then(updatedTalk => ({
    data: updatedTalk.data,
    toggle: !toggle,
  })),
});

export const changeTalkOwner = (talkId, selectedOwner, toggle, accessToken) => ({
  type: 'CHANGE_TALK_OWNER_IN_DB',
  payload: axios({
    method: 'put',
    url: 'api/talks/changeTalkOwner',
    headers: {
      Authorization: accessToken,
    },
    data: {
      talkId,
      selectedOwner,
    },
  }).then(updatedTalk => ({
    data: updatedTalk.data,
    toggle: !toggle,
  })),
});

export const toggleStatusEdit = (talkId, toggle) => ({
  type: 'TOGGLE_STATUS_EDIT',
  payload: {
    talkId,
    toggle: !toggle,
  },
});

export const toggleOwnerEdit = (talkId, toggle) => ({
  type: 'TOGGLE_OWNER_EDIT',
  payload: {
    talkId,
    toggle: !toggle,
  },
});

export const toggleShowMore = (talkId, toggle) => ({
  type: 'TOGGLE_SHOWMORE',
  payload: {
    talkId,
    toggle: !toggle,
  },
});

export const toggleTalkEdit = (talkId, toggle) => ({
  type: 'TOGGLE_TALK_EDIT',
  payload: {
    talkId,
    toggle: !toggle,
  },
});

export const deleteTalk = (talkId, accessToken) => ({
  type: 'DELETE_TALK',
  payload: axios({
    method: 'delete',
    url: `/api/talks/${talkId}`,
    headers: {
      Authorization: accessToken,
    },
  }).then(() => talkId),
});

export const handleTalkChange = (talkId, value, type) => ({
  type: 'HANDLE_TALK_CHANGE',
  payload: {
    talkId,
    value,
    type,
  },
});

export const updateTalkInfo = (
  talkId,
  newTopic,
  newDescription,
  newAdminNotes,
  toggle,
  accessToken,
) => ({
  type: 'UPDATE_TALK_INFO',
  payload: axios({
    method: 'put',
    url: 'api/talks/changeTalkContent',
    headers: {
      Authorization: accessToken,
    },
    data: {
      talkId,
      newTopic,
      newDescription,
      newAdminNotes,
    },
  }).then(updatedTalk => ({
    data: updatedTalk.data,
    toggle: !toggle,
  })),
});
