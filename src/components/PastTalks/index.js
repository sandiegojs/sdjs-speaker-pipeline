import { connect } from 'react-redux';
import PastTalks from './PastTalks'

function mapStoreToProps(store){
    return {
        pastTalks: store.PastTalks.pastTalks,
        accessToken: store.AdminLogin.token
    };
}

export default connect(mapStoreToProps)(PastTalks);