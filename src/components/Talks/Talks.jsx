import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getTalkData, handleSelect, changeTalkStatus } from './TalksActions';
import AdminNav from '../AdminNav/AdminNav';
const moment = require('moment');

const TableRow = ({ data, children }) => {
  return <td>
    {children
      ? children
      : Object.keys(data).map(key =>
        <div className={`table-${key}`}>{data[key]}</div>
      )
    }
  </td>
}

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
      let talks = talkInfo;
      console.log(this.props.filter);
      if (this.props.filter) {
        talks = talkInfo.filter(this.props.filter);
        console.log(talks);
      }

      let headers = ['Speaker', 'Talk', 'Event', 'Current Status', 'Action']
      if (this.props.include) {
        headers = headers.filter((header) => this.props.include.includes(header))
        console.log('talks before render', talks)
      }


      return (
        <div>
          <div className='admin-info'>
            <table className='table'>
              <tr>
                {
                  headers.map(header => (
                    <th>{header}</th>
                  ))}
              </tr>
              {
                talks.map((talk, i) => <tr key={i}>
                  {
                    headers.map(column => {
                      switch (column) {
                        case 'Speaker':
                          return <TableRow data={{ speaker: talk.speaker, speakerEmail: <a href={`mailto:${talk.speakerEmail}`} target="_top"><i className="far fa-envelope"></i>Send Email</a> }} />
                        case 'Talk':
                          return <TableRow data={{ topic: talk.topic, description: talk.description }} />
                        case 'Current Status':
                          return <TableRow data={{ currentStatus: talk.currentStatus }} />
                        case 'Event':
                          return <TableRow data={{ eventName: talk.eventName, eventDate: moment(talk.eventDate).format('YYYY-MM-DD')}} />
                        case 'Action':
                          return <TableRow>
                            <div className='table-tableAction'>
                              <div className='table-tableStatus'>
                                <select name={talk.talkId} onChange={this.handleSelect}>
                                  <option value=''>Change Status</option>
                                  <option value='In Contact'>In Contact</option>
                                  <option value='Approve'>Approve</option>
                                  <option value='Deny'>Deny</option>
                                  <option value='Disengaged'>Disengaged</option>
                                </select>
                                <button className='btn' name={talk.talkId} onClick={this.handleSubmit}>Submit</button>
                              </div>
                              <div className='table-tableConfirmation'>{talk.confirmationMessage ? talk.confirmationMessage : ' '}</div>
                            </div>
                          </TableRow>
                        default:
                          return null;
                      }
                    })
                  }
                </tr>)
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