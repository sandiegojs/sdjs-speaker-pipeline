import { connect } from 'react-redux';
import Meetups from './Meetups';

function mapStoreToProps(store){
    return {
        eventInfo: store.Meetups.eventInfo,
        accessToken: store.AdminLogin.token
    };
}

export default connect(mapStoreToProps)(Meetups);