import axios from 'axios';

export const updateUsername = value => ({
  type: 'UPDATE_USERNAME',
  payload: value,
});

export const updatePassword = value => ({
  type: 'UPDATE_PASSWORD',
  payload: value,
});

export const rememberMe = value => ({
  type: 'REMEMBER_ME',
  payload: value,
});

export const postLogin = userData => ({
  type: 'POST_LOGIN',
  payload: axios.post('api/organizers/login', userData)
    .then(response => response.data),
});


export const postLoginPersist = userData => ({
  type: 'POST_LOGIN_PERSIST',
  payload: axios.post('api/organizers/login', userData)
    .then(response => response.data),
});

export const checkToken = accessToken => ({
  type: 'CHECK_TOKEN',
  payload: axios({
    method: 'get',
    url: `api/accessTokens/${accessToken}`,
    headers: {
      Authorization: accessToken,
    },
  }).then(response => response.data),
});
