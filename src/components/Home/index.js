import { connect } from 'react-redux';
import Home from './Home';

function mapStoreToProps(store) {
  return {
    submmitted: store.SignUp.submitted,
  };
}

export default connect(mapStoreToProps)(Home);
