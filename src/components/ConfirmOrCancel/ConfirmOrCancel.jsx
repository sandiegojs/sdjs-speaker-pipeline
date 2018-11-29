import React, { Component } from 'react';
import { Redirect }         from 'react-router';
import Navbar               from '../Navbar/Navbar';
import { handleSpeakerToken, handleTalkId, changeTalkStatus } from '../ConfirmOrCancel/ConfirmOrCancelActions'

class ConfirmOrCancel extends Component {
    constructor(props) {
        super(props)
        this.handleSubmitStatus = this.handleSubmitStatus.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const urlParams = new URLSearchParams(this.props.location.search);
        const t = urlParams.get('t');
        const eventId = urlParams.get('eventId');
        dispatch(handleSpeakerToken(t));
        dispatch(handleTalkId(eventId));
    }

    handleSubmitStatus(e) {
        const { dispatch, speakerToken, eventId } = this.props;
        dispatch(changeTalkStatus(eventId, e.target.name, speakerToken));
    }

    render() { 
        if (this.props.confirmed == true) {
        return <Redirect push to="/" />;
      }
        return (
            <div>
                <Navbar />
                <div id='confirmation'>
                    <h1>Confirmation</h1>
                    <p>Thank you for visiting our Confirmation page. You have an upcoming event scheduled in three days.
                    Please confirm your Talk. Or for what ever reason you are no longer available to speak at your event,
                    please click the cancel button.
                    </p>
                    <div className='buttons'>
                        <button className='btn' name='Confirmed' onClick={this.handleSubmitStatus}>
                            Confirm
                        </button>
                        <button className='btn' name='Disengaged' onClick={this.handleSubmitStatus}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmOrCancel;
