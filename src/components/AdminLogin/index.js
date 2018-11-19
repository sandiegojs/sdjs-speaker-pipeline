import { connect } from 'react-redux';
import AdminLogin from './AdminLogin';

function mapStoreToProps(store){
    return {
        username: store.AdminLogin.username,
		password: store.AdminLogin.password,
        accessToken: store.AdminLogin.accessToken,
        authorized: store.AdminLogin.authorized,
        remember: store.AdminLogin.remember
    };
}

export default connect(mapStoreToProps)(AdminLogin);
