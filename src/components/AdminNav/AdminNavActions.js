import axios from 'axios';

export const postLogout = accessToken => ({
  type: 'POST_LOGOUT',
  payload: axios({
    method: 'post',
    url: 'api/organizers/logout',
    headers: {
      Authorization: accessToken,
    },
  }).then(response => response.data),
});


export default postLogout;
