import { connect } from 'react-redux';
import SignUp from './SignUp';

function mapStoreToProps(store) {
  return {
    date: store.SignUp.date,
    description: store.SignUp.description,
    events: store.SignUp.events,
    phone: store.SignUp.phone,
    speakerEmail: store.SignUp.speakerEmail,
    speakerName: store.SignUp.speakerName,
    submitted: store.SignUp.submitted,
    topic: store.SignUp.talkTopic,
  };
}

export default connect(mapStoreToProps)(SignUp);
