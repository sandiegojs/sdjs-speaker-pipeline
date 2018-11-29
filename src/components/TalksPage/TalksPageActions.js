export const handleOwnerFilter = (selectedOwner) => {
    return {
        type: 'UPDATE_OWNER_FILTER_IN_STORE',
        payload: selectedOwner
    }
}
