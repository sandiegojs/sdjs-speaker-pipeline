import { connect } from 'react-redux';
import Talks from './Talks';

function mapStoreToProps(store){
    return {
        talkInfo: store.Talks.talkInfo,
        accessToken: store.AdminLogin.token
    };
}

export default connect(mapStoreToProps)(Talks);