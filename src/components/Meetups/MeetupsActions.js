import axios from 'axios';

export const getEvents = accessToken => ({
  type: 'GET_EVENTS',
  payload: axios({
    method: 'get',
    url: 'api/talks/getMeetups',
    headers: {
      Authorization: accessToken,
    },
  })
    .then(response => response.data)
    .catch(err => err),
});


export default getEvents;
