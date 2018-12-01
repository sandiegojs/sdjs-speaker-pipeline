import axios from 'axios';

export const changeTalkStatus = (talkId, selectedStatus, speakerToken) => ({
  type: 'SUBMIT_STATUS',
  payload: axios.get('api/robotLogin').then((accessToken) => {
    axios({
      method: 'put',
      url: 'api/talks/changeTalkStatus',
      headers: {
        Authorization: accessToken.data.id,
      },
      data: {
        talkId,
        selectedStatus,
      },
    }).then(() => {
      axios({
        method: 'delete',
        url: `api/accessTokens/${speakerToken}`,
        headers: {
          Authorization: accessToken.data.id,
        },
        data: {
          speakerToken,
        },
      });
    });
  }),
});


export const handleSpeakerToken = t => ({
  type: 'HANDLE_SPEAKER_TOKEN',
  payload: t,
});

export const handleTalkId = id => ({

  type: 'HANDLE_TALK_ID',
  payload: id,

});
