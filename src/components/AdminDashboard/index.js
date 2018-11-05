import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';

function mapStoreToProps(store){
    return {
        talks: store.AdminDashboard.talks,
        speakers: store.AdminDashboard.speakers,
        events: store.AdminDashboard.events,
        status: store.AdminDashboard.status,
        toggleApprovedConfirm: store.AdminDashboard.toggleApprovedConfirm,
        toggleDeniedConfirm: store.AdminDashboard.toggleDeniedConfirm
    };
}

export default connect(mapStoreToProps)(AdminDashboard);