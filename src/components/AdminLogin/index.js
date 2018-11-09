import { connect } from 'react-redux';
import AdminLogin from './AdminLogin';

function mapStoreToProps(store){
    return {
        username: store.AdminLogin.username,
		password: store.AdminLogin.password,
		token: store.AdminLogin.token,
        userId: store.AdminLogin.userId,
    };
}

export default connect(mapStoreToProps)(AdminLogin);