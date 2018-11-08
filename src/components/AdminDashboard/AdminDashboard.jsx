import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { getTalkData, handleSelect, changeTalkStatus } from './AdminDashboardActions';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTalkData());
  }

  handleSelect(e) {
    const { dispatch } = this.props;
    dispatch(handleSelect(e.target.name, e.target.value))
  }

  handleSubmit(e) {
    const { dispatch, talkInfo } = this.props;
    const selectedTalk = talkInfo.find((talk) => talk.talkId === e.target.name)
    dispatch(changeTalkStatus(e.target.name, selectedTalk.selectedStatus))
  }

  render() {
    const { talkInfo } = this.props;
    if (talkInfo[0]) {
      return (
        <div>
          <Navbar />
          <div className='admin-banner'>
            <h1>Admin Dashboard</h1>
          </div>
          <div className='admin-info'>
            <h3>Pending Speakers</h3>
            <table className='table'>
              <tr>
                <th>Speaker</th>
                <th>Talk</th>
                <th>Event</th>
                <th>Action</th>
              </tr>
              {
                talkInfo.map((talk, i) => (
                  <tr key={i}>
                    <td>
                      <div className='table-speaker'>
                        <div className='table-speaker-name'>{talk.speaker}</div>
                        <div className='table-speaker-email'>{talk.speakerEmail}</div>
                        <a href='#'>See All Details</a>
                      </div>
                    </td>
                    <td>
                      <div className='table-talk'>
                        <div className='table-talk-topic'>Topic: {talk.topic}</div>
                        <div className='table-talk-description'>Description: {talk.description}</div>
                      </div>
                    </td>
                    <td>
                      <div className='table-event'>
                        <div className='table-event-name'>{talk.eventName}</div>
                        <div className='table-event-date'>{talk.eventDate}</div>
                      </div>
                    </td>
                    <td>
                      <select name={talk.talkId} onChange={this.handleSelect}>
                        <option value=''>Select Status</option>
                        <option value='In Contact'>In Contact</option>
                        <option value='Approve'>Approve</option>
                        <option value='Deny'>Deny</option>
                        <option value='Disengaged'>Disengaged</option>
                      </select>
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