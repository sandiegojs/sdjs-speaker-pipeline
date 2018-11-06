import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTalkData, handleRadioChange, changeTalkStatus } from './AdminDashboardActions';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getTalkData());
    }

    handleRadioChange(e) {
        const { dispatch } = this.props;
        dispatch(handleRadioChange(e.target.name, e.target.value))
    }

    handleSubmit(e) {
        const { dispatch, talkInfo } = this.props;
        const selectedTalk = talkInfo.find((talk) => talk.talkId === e.target.name)
        if (selectedTalk.status == 'Approve') {
            dispatch(changeTalkStatus(e.target.name, 'Approve'))
        }
        if (selectedTalk.status == 'Deny') {
            dispatch(changeTalkStatus(e.target.name, 'Deny'))
        }
    }

    render() {
        const { talkInfo } = this.props;
        if (talkInfo[0]) {
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
                            talkInfo.map((talk, i) => (
                                <tr key={i}>
                                    <td> {talk.speaker} </td>
                                    <td>{talk.topic}</td>
                                    <td>{talk.event}</td>
                                    <td>
                                        <input type='radio' name={talk.talkId} value='Approve' onChange={this.handleRadioChange} />Approve
                                        <input type='radio' name={talk.talkId} value='Deny' onChange={this.handleRadioChange} />Deny
                                        <button name={talk.talkId} onClick={this.handleSubmit}>Submit</button>
                                        <div>{talk.confirmationMessage ? talk.confirmationMessage : null}</div>
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