import { connect } from 'react-redux';
import ConfirmOrCancel from './ConfirmOrCancel';

function mapStoreToProps(store) {
  return {
    accessToken: store.AdminLogin.accessToken,
    confirmed: store.ConfirmOrCancel.confirmed,
    eventId: store.ConfirmOrCancel.eventId,
    speakerToken: store.ConfirmOrCancel.speakerToken,
    talkInfo: store.Talks.talkInfo,
  };
}

export default connect(mapStoreToProps)(ConfirmOrCancel);
