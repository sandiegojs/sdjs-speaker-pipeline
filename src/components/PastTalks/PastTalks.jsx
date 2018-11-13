import React, { Component } from 'react';
import { getPastTalks } from './PastTalksActions'
import moment from 'moment';

class PastTalks extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        const { dispatch, accessToken } = this.props;
        dispatch(getPastTalks(accessToken));
    }

    render(){
        const { pastTalks } = this.props;
        return(
            
            <div>
                <div>
                    <h1>Past Talks: </h1>
                </div>
                <div>
                    <table className='table'>
                        <tr className='past-talk-header'>
                            <th>Date</th>
                            <th>Event</th>
                            <th>Speaker</th>
                            <th>Topic</th>
                        </tr>
                        {pastTalks && pastTalks.map(talk => (
                            <tr>
                                <td>{moment(talk.date).add(1, 'day').format('YYYY-MM-DD')}</td>
                                <td>{talk.event}</td>
                                <td>{talk.speaker}</td>
                                <td>{talk.topic}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        )
    }
}

export default PastTalks