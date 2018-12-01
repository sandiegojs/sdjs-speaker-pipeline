import { connect } from 'react-redux';
import Thankyou from './Thankyou';

function mapStoreToProps(store) {
  return {
    submmitted: store.SignUp.submitted,
  };
}

export default connect(mapStoreToProps)(Thankyou);
