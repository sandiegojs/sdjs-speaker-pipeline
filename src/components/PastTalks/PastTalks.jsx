import React, { Component } from 'react';
import moment from 'moment';
import { getPastTalks } from './PastTalksActions';


class PastTalks extends Component {
  componentDidMount() {
    const { dispatch, accessToken } = this.props;
    dispatch(getPastTalks(accessToken));
  }

  render() {
    const { pastTalks } = this.props;
    let styling = '';

    if (this.props.styling) {
      styling = this.props.styling;
    }

    return (
      <table className="table">
        <thead>
          <tr className={styling}>
            <th>Date</th>
            <th>Event</th>
            <th>Speaker</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          {pastTalks.map((talk, i) => (
            <tr key={i}>
              <td>
                {moment(talk.eventDate)
                  .add(1, 'day')
                  .format('YYYY-MM-DD')}
              </td>
              <td>{talk.eventName}</td>
              <td>{talk.speaker}</td>
              <td>{talk.topic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default PastTalks;
