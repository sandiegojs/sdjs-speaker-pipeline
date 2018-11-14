const axios = require('axios');

export const addAdmin = (realm, newAdminName, newAdminEmail, newAdminPhone, adminTempPw) => {
	console.log('addAdmin action')
	console.log('newAdminName: ', newAdminName, 'newAdminEmail: ', newAdminEmail, 'newAdminPhone: ', newAdminPhone, 'adminTempP: ', adminTempPw)
	return {
		type: 'ADD_ADMIN',
		payload: axios.post('api/Users', { realm: realm, username: newAdminName, email: newAdminEmail, phone: newAdminPhone, password: adminTempPw }
		)
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
	console.log('hello from admin update action')
	return {
		type: 'ADMIN_UPDATE',
		payload: index
	}
}
export const editAdmin = (adminId, adminName, adminEmail, adminPhone) => {
	console.log('edit Admin action')
	console.log('AdminName: ', adminName, 'AdminEmail: ', adminEmail, 'AdminPhone: ', adminPhone)
	return {
		type: 'EDIT_ADMIN',
		payload: axios.patch('api/Users/:id', { id: adminId, newAdminEmail: adminEmail, adminPhone: adminPhone }
		)
	}
}
export const deleteAdmin = (id) => {
	console.log('this is delete admin in actions')
	return {
		type: 'DELETE_ADMIN',
		payload: axios
			.delete(`api/Users/${id}`)
			.then(() => id)
	}
}
export const getAdmins = () => {
	console.log('organizers edit get admins')
	return {
		type: 'GET_ADMINS',
		payload: axios.get('api/users')
			.then(response => {
				//for each user, add isEditing property, and return that
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

export const patchAdmin = (id, index, jsonObject) => {
	return {
				type: 'PATCH_ADMIN',
				payload: axios.patch(`api/Users/${id}`, jsonObject)
				.then((response) => {
					return {
						index,
						user: response.data
					}
				})
			
		}
	}
	