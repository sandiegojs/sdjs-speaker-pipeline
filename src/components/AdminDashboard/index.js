import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';

function mapStoreToProps(store){
    return {
        talkInfo: store.AdminDashboard.talkInfo
    };
}

export default connect(mapStoreToProps)(AdminDashboard);