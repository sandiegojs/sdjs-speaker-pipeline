import { connect } from 'react-redux';
import Talks from './Talks';

function mapStoreToProps(store){
    return {
        talkInfo: store.Talks.talkInfo,
        eventInfo: store.Talks.eventInfo
    };
}

export default connect(mapStoreToProps)(Talks);