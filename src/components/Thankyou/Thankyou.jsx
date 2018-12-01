import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { resetSubmitted } from '../SignUp/SignUpActions';

class Thankyou extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetSubmitted());
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id="confirmation">
          <div>
            Thank you! Your submission has been received and we will be in
            contact shortly.
          </div>
          <div>
            <i
              className="far fa-check-circle"
              style={{ fontSize: '125pt', color: 'green', marginTop: '40px' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Thankyou;
