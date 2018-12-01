import axios from 'axios';

export const addAdmin = (
  newAdminName,
  newAdminEmail,
  newAdminPhone,
  newAdminPassword,
  accessToken,
) => ({
  type: 'ADD_ADMIN',
  payload: axios({
    method: 'post',
    url: 'api/organizers',
    data: {
      username: newAdminName,
      email: newAdminEmail,
      phone: newAdminPhone,
      password: newAdminPassword,
    },
    headers: {
      Authorization: accessToken,
    },
  }),
});

export const deleteAdmin = (id, accessToken) => ({
  type: 'DELETE_ADMIN',
  payload: axios({
    method: 'delete',
    url: `api/organizers/${id}`,
    headers: {
      Authorization: accessToken,
    },
  }).then(() => id),
});
export const getAdmins = accessToken => ({
  type: 'GET_ADMINS',
  payload: axios({
    method: 'get',
    url: 'api/organizers',
    headers: {
      Authorization: accessToken,
    },
  }).then(response => response.data.map(admin => ({ ...admin, isEditing: false }))),
});
export const onChange = (key, value) => ({
  type: 'ON_CHANGE',
  payload: {
    [key]: value,
  },
});
export const toggleEdit = index => ({
  type: 'TOGGLE_EDIT',
  payload: index,
});
export const patchAdmin = (id, index, jsonObject, accessToken) => ({
  type: 'PATCH_ADMIN',
  payload: axios({
    method: 'patch',
    url: `api/organizers/${id}`,
    data: jsonObject,
    headers: {
      Authorization: accessToken,
    },
  }).then(response => ({
    index,
    user: response.data,
  })),
});
