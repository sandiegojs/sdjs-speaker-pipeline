import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTalkData, getSpeakerData, getEventData, handleRadioChange, approveTalkStatus, denyTalkStatus } from './AdminDashboardActions';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getTalkData());
        dispatch(getSpeakerData());
        dispatch(getEventData());
    }

    handleRadioChange(e) {
        const { dispatch } = this.props;
        dispatch(handleRadioChange(e.target.name, e.target.value))
    }

    handleSubmit(e) {
        const { dispatch, status } = this.props;
        const selectedStatus = status.find((status) => status.talkId === e.target.name)
        if (selectedStatus.status == 'Approve') {
            dispatch(approveTalkStatus(e.target.name))
            // dispatch(sendEmailToSpeaker(true, 'tiana.hayden@me.com', ))
            // dispatch(briansfunction(approved, adminemail, meetupdate, meetuptitle, pending, speakeremail ))
        }
        if (selectedStatus.status == 'Deny') {
            dispatch(denyTalkStatus(e.target.name))
        }
    }

    render() {
        const { talks, speakers, events, status } = this.props;
        if (talks[0] && speakers[0] && events[0]) {
            const talkInformation = talks.map((talk) => {
                let sIndex = speakers.findIndex((speaker) => speaker.id === talk.speakerId)
                let eIndex = events.findIndex((singleEvent) => singleEvent.id === talk.eventId)
                let statusIndex = status.findIndex((singleStatus) => singleStatus.talkId == talk.id)
                let confirmation = null
                if (status[statusIndex].confirmationMessage) {
                    confirmation = status[statusIndex].confirmationMessage
                }
                return {
                    speaker: `${speakers[sIndex].firstName} ${speakers[sIndex].lastName}`,
                    topic: talk.topic,
                    talkId: talk.id,
                    event: events[eIndex].name,
                    confirmation: confirmation
                }
            })
            return (
                <div>
                    <Link to="/Home">
                        <button className="btn">Home</button>
                    </Link>
                    <h1>Pending Speakers</h1>
                    <table>
                        <tr>
                            <th>Speaker</th>
                            <th>Topic</th>
                            <th>Event</th>
                            <th>Action</th>
                        </tr>
                        {
                            talkInformation.map((talk, i) => (
                                <tr key={i}>
                                    <td> {talk.speaker} </td>
                                    <td>{talk.topic}</td>
                                    <td>{talk.event}</td>
                                    <td>
                                        <input type='radio' name={talk.talkId} value='Approve' onChange={this.handleRadioChange} />Approve
                                        <input type='radio' name={talk.talkId} value='Deny' onChange={this.handleRadioChange} />Deny
                                        <button name={talk.talkId} onClick={this.handleSubmit}>Submit</button>
                                        <div>{talk.confirmation}</div>
                                    </td>
                                </tr>
                            ))
                        }
                    </table>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Link to="/Home">
                        <button className="btn">Home</button>
                    </Link>
                    <div> There Are No Pending Talks </div>
                </div>
            )
        }
    }
}

export default AdminDashboard;