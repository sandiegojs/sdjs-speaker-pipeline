import axios from 'axios';
import moment from 'moment';

export const getPastTalks = accessToken => ({
  type: 'GET_PAST_TALKS',
  payload: axios({
    method: 'get',
    url: 'api/talks/getTalkDetails',
    headers: {
      Authorization: accessToken,
    },
  }).then((talkInfo) => {
    const date = moment().format();
    const filtered = talkInfo.data.filter(
      talk => (talk.currentStatus === 'Approve' || talk.currentStatus === 'Confirmed') && moment(talk.eventDate).format() < date,
    );
    filtered.sort((a, b) => {
      const c = moment(a.eventDate).format();
      const d = moment(b.eventDate).format();
      if (c > d) {
        return -1;
      } if (c < d) { return 1; }
      return 0;
    });
    return filtered;
  }),
});


export default getPastTalks;
