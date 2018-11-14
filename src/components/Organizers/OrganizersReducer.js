const initialstate = {
	adminList       : [], 
    newAdminEmail   : '',
    newAdminName    : '',
    newAdminPhone   : '',
}
export default function OrganizersReducer(state = initialstate, action) {
	const { payload, type } = action;

	switch (type) {
        case 'ON_CHANGE': {
			return {
				...state,
				...payload
			}
        }
        case 'UPDATE_ADMIN_LIST': {
			return {
				...state,
				adminList: payload
			}
		}
		case 'ADMIN_UPDATE': {
			const newAdminList = [...state.adminList];
			newAdminList.splice(payload, 1, { 
				...newAdminList[payload], 
				isEditing: !newAdminList[payload].isEditing 
			});
			return {
				...state,
				adminList: newAdminList
			}
		}
		case 'DELETE_ADMIN_FULFILLED': {
			console.log('this is delete admin fulfilled')
			console.log('this is payload', payload)
			// const temp = Object.values(payload.request.responseURL); //this is an array of the url from the promise
			// const index = temp.join('').slice(32) // this is a string of the id number of the admin
			// console.log('this is index in delete admin fulfilled', index)

			const newAdminList = [...state.adminList]; //this is a copy of admin list
			console.log('this is new admin list', newAdminList)
			  const admin = newAdminList.findIndex(admin => { //admin represents the object i want to delete
            return admin.id == payload
			});
			console.log('this is admin', admin)

			const updatedList = newAdminList.splice(admin, 1) //updated list represents the new adminList after splicing out the deleted admin
			console.log('this is updatedList', updatedList)
			return {
				...state,
				adminList: newAdminList
			}
		}
		case 'GET_ADMINS_FULFILLED': {
			console.log('get admin fulfilled')
			return {
				...state,
				adminList: payload
			}
		}
		case 'ADD_ADMIN_FULFILLED': {
			return {
				...state,
				adminList: state.adminList.concat(payload.data),
				newAdminEmail: '',
				newAdminName : '',
				newAdminPhone: ''
			}
		}
		case 'PATCH_ADMIN': {
			return {
				...state,
				adminList: payload.data
			}
		}
		case 'PATCH_ADMIN_FULFILLED': {
			const newAdminList = [...state.adminList];
			newAdminList.splice(payload.index, 1, { 
				...newAdminList[payload.index], 
				...payload.user,
				isEditing: !newAdminList[payload.index].isEditing 
			});
			return {
				...state,
				adminList: newAdminList
			}
		}
		case 'TOGGLE_EDIT': {
			const newAdminList = [...state.adminList];
			newAdminList.splice(payload, 1, { 
				...newAdminList[payload], 
				isEditing: !newAdminList[payload].isEditing 
			});
			return {
				...state,
				adminList: newAdminList
			}
		}
		case 'ADMIN_CHANGE_INPUT': {
			console.log('this is admin change input reducer')
			console.log('this is payload', payload)
			const newAdminList = [...state.adminList]; //this is a copy of admin list
			console.log('this is new admin list', newAdminList)
			  const index = newAdminList.findIndex(admin => { //admin represents the object i want to delete
            return admin.id == payload.id
			});
			console.log('this is index', index)

			const newAdmin = { ...newAdminList[index], ...payload }
			newAdminList.splice(index, 1, newAdmin);
			return {
				...state,
				adminList: newAdminList
			}
		}
		default: {
			return state
		}
	}
}
