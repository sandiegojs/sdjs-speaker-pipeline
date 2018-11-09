import { connect } from 'react-redux';
import SignUp from './SignUp';

function mapStoreToProps(store){
    return {
      eventDetails  : store.SignUp.eventDetails,
      speakerDate   : store.SignUp.speakerDate,
      speakerEmail  : store.SignUp.speakerEmail,
      eventId       : store.SignUp.eventID,
      events        : store.SignUp.events,
      speakerName   : store.SignUp.speakerName,
      eventName     : store.SignUp.eventName,
      speakerId     : store.SignUp.speakerId,
      submitted     : store.SignUp.submitted,
      talkTopic     : store.SignUp.talkTopic,
      phone         : store.SignUp.phone
        
    };
}

export default connect(mapStoreToProps)(SignUp);