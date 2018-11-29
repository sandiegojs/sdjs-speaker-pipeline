import { connect } from 'react-redux';
import Meetups from './Meetups';

function mapStoreToProps(store){
    return {
        eventInfo: store.Meetups.eventInfo,
        accessToken: store.AdminLogin.accessToken,
        authorized: store.AdminLogin.authorized
    };
}

export default connect(mapStoreToProps)(Meetups);
