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
                    <div className='navbar'>
                        <img className='logo' src='https://tinyurl.com/yb9xzoo5' />
                        <Link to='/'>
                            <button className="btn">Home</button>
                        </Link>
                    </div>

                    <div className='admin-banner'>
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className='admin-info'>
                        <h3>Pending Speakers</h3>
                        <table className='table'>
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
                                        <td>{talk.eventName}</td>
                                        <td>
                                            <input className='approve' type='radio' name={talk.talkId} value='Approve' onChange={this.handleRadioChange} />Approve
                                            <input className='deny' type='radio' name={talk.talkId} value='Deny' onChange={this.handleRadioChange} />Deny
                                            <button className='btn' name={talk.talkId} onClick={this.handleSubmit}>Submit</button>
                                            <div>{talk.confirmationMessage ? talk.confirmationMessage : null}</div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className='navbar'>
                        <img className='logo' src='https://tinyurl.com/yb9xzoo5' />
                        <Link to='/'>
                            <button className="btn">Home</button>
                        </Link>
                    </div>
                    <div className='navbar'>

                    </div>
                    <div className='admin-banner'>
                        <h1>Admin Dashboard</h1>
                    </div>
                    <div className='admin-info'>
                        <h3>Pending Speakers</h3>
                        <p>There are no pending speakers.</p>
                    </div>
                </div>
            )
        }
    }
}

export default AdminDashboard;