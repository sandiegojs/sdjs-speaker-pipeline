import React, { Component } from 'react';
import { getPastTalks } from './PastTalksActions'
import moment from 'moment';

class PastTalks extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch, accessToken } = this.props;
        dispatch(getPastTalks(accessToken));
    }

    render() {
        const { pastTalks } = this.props;
        let styling =''

        if (this.props.styling) {
            styling = this.props.styling
          }

        return (
            <table className='table'>
                <tr className={styling}>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Speaker</th>
                    <th>Topic</th>
                </tr>
                {pastTalks.map(talk => (
                    <tr>
                        <td>{moment(talk.date).add(1, 'day').format('YYYY-MM-DD')}</td>
                        <td>{talk.event}</td>
                        <td>{talk.speaker}</td>
                        <td>{talk.topic}</td>
                    </tr>
                ))}
            </table>
        )
    }
}

export default PastTalks