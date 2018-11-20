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
        let styling = ''

        if (this.props.styling) {
            styling = this.props.styling
        }

        return (
            <table className='table'>
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
                            <td>{moment(talk.date).add(1, 'day').format('YYYY-MM-DD')}</td>
                            <td>{talk.eventName}</td>
                            <td>{talk.speaker}</td>
                            <td>{talk.topic}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

export default PastTalks;
