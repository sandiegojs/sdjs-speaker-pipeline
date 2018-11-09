import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTalkData, handleSelect, changeTalkStatus } from './TalksActions';
import AdminNav from '../AdminNav/AdminNav';
const moment = require('moment');

class Talks extends Component {
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
          <AdminNav/>
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
                <th>Current Status</th>
                <th>Action</th>
              </tr>
              {
                talkInfo.map((talk, i) => (
                  <tr key={i}>
                    <td>
                      <div className='table-speaker'>
                        <div className='table-speaker-name'>{talk.speaker}</div>
                        <a href={`mailto:${talk.speakerEmail}`} target="_top"><i className="far fa-envelope"></i>Send Email</a>
                        <div className='show-more'><i className="fas fa-plus"></i>Show More</div>
                      </div>
                    </td>
                    <td>
                      <div className='table-talk'>
                        <div className='table-talk-topic'>{talk.topic}</div>
                        <div className='table-talk-description'>{talk.description}</div>
                      </div>
                    </td>
                    <td>
                      <div className='table-event'>
                        <div className='table-event-name'>{talk.eventName}</div>
                        <div className='table-event-date'>{moment(talk.eventDate).format('YYYY-MM-DD')}</div>
                      </div>
                    </td>
                    <td>
                      <div className='table-status'>
                        <div className='table-status-current'>{talk.currentStatus}</div>
                      </div>
                    </td>
                    <td>
                      <div className='table-action'>
                      <select name={talk.talkId} onChange={this.handleSelect}>
                        <option value=''>Change Status</option>
                        <option value='In Contact'>In Contact</option>
                        <option value='Approve'>Approve</option>
                        <option value='Deny'>Deny</option>
                        <option value='Disengaged'>Disengaged</option>
                      </select>
                      <button className='btn' name={talk.talkId} onClick={this.handleSubmit}>Submit</button>
                      </div>
                      <div className='table-confirmation'>{talk.confirmationMessage ? talk.confirmationMessage : null}</div>
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
          <AdminNav />
          <div className='admin-banner'>
            <h1>Admin Dashboard</h1>
            <p>hello</p>
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

export default Talks;