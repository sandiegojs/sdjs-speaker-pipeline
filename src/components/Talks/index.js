import { connect } from 'react-redux';
import Talks from './Talks';

function mapStoreToProps(store){
    return {
        talkInfo: store.Talks.talkInfo,
        accessToken: store.AdminLogin.accessToken,
        authorized: store.AdminLogin.authorized
    };
}

export default connect(mapStoreToProps)(Talks);