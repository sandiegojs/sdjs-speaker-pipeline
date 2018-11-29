import axios from 'axios';

export const addAdmin = (newAdminName, newAdminEmail, newAdminPhone, newAdminPassword, accessToken) => {
	return {
		type: 'ADD_ADMIN',
		payload: axios({
			method: 'post',
			url: 'api/organizers',
			data: {
				username: newAdminName, 
				email: newAdminEmail, 
				phone: newAdminPhone, 
				password: newAdminPassword 
			},
			headers: {
				Authorization: accessToken
			}
		})
	}
}
export const deleteAdmin = (id, accessToken) => {
	return {
		type: 'DELETE_ADMIN',
		payload: axios({ 
			method: 'delete',
			url:`api/organizers/${id}`,
			headers: {
				Authorization: accessToken
			}
		})
			.then(() => id)
	}
}
export const getAdmins = (accessToken) => {
	return {
		type: 'GET_ADMINS',
		payload: axios({
			method: 'get',
			url: 'api/organizers',
			headers: {
				Authorization: accessToken
			}
		})
			.then(response => {
				return response.data.map(admin => ({...admin, isEditing: false}))
			})
	}
}
export const onChange = (key, value) => {
	return {
		type: 'ON_CHANGE',
		payload: {
			[key]: value
		}
	}
}
export const toggleEdit = (index) => {
	return {
		type: 'TOGGLE_EDIT',
		payload: index
	}
}
export const patchAdmin = (id, index, jsonObject, accessToken) => {
	return {
				type: 'PATCH_ADMIN',
				payload: axios({
					method: 'patch',
					url:`api/organizers/${id}`, 
					data: jsonObject,
					headers: {
						Authorization: accessToken
					}
				})
				.then((response) => {
					return {
						index,
						user: response.data
					}
				})
			
		}
	}
	