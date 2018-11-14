const axios = require('axios');

export const addAdmin = (realm, newAdminName, newAdminEmail, newAdminPhone, adminTempPw, accessToken) => {
	return {
		type: 'ADD_ADMIN',
		payload: axios({
			method: 'post',
			url: 'api/organizers',
			data: {
				realm: realm, 
				username: newAdminName, 
				email: newAdminEmail, 
				phone: newAdminPhone, 
				password: adminTempPw 
			},
			headers: {
				Authorization: accessToken
			}
		})
	}
}
export const adminChangeInput = (id, type, value) => {
	return {
		type: 'ADMIN_CHANGE_INPUT',
		payload: {
			[type]: value,
			id: id,
		}
	}
}
export const adminUpdate = (index) => {
	return {
		type: 'ADMIN_UPDATE',
		payload: index
	}
}
export const editAdmin = (adminId, adminName, adminEmail, adminPhone, accessToken) => {
	return {
		type: 'EDIT_ADMIN',
		payload: axios({ 
			method: 'patch',
			url:'api/organizers/:id',
			data: {
				id: adminId, 
				newAdminEmail: adminEmail, 
				adminPhone: adminPhone 
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
				return response.data.map(admin => Object.assign({}, admin, { isEditing: false }))
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

export const updateAdminList = (value) => {
	return {
		type: 'UPDATE_ADMIN_LIST',
		payload: value
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
	