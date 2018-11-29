import { connect } from 'react-redux';
import AdminNav from './AdminNav';

function mapStoreToProps(store) {
  return {
    accessToken: store.AdminLogin.accessToken,
  };
}

export default connect(mapStoreToProps)(AdminNav);
