import { connect } from 'react-redux';
import Organizers from './Organizers';


function mapStoreToProps(store){
    return {
        adminList    : store.Organizers.adminList,
        newAdminName : store.Organizers.newAdminName,
        newAdminPhone: store.Organizers.newAdminPhone,
        newAdminEmail: store.Organizers.newAdminEmail,
        password     : store.Organizers.password,
        accessToken  : store.AdminLogin.token
    };
}

export default connect(mapStoreToProps)(Organizers); 