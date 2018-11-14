import React, { Component } from 'react';
import { getEvents } from './MeetupsActions';
import Talks from '../Talks';
import AdminNav from '../AdminNav/AdminNav';

class Meetups extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, accessToken } = this.props;
        dispatch(getEvents(accessToken));
    }

    render() {
        const { eventInfo } = this.props;

        return (
            <div>
                <AdminNav />
                <div className='meetups'>
                    <div className='meetups-child'>
                        <h1>Upcoming Meetups</h1>
                        <div>
                            {eventInfo && eventInfo.map(meetup => (
                                <div className='single-meetup' key={meetup.venue.id}>
                                    <div className='header'>
                                        <div>{meetup.date}</div>
                                        <div>{meetup.name}</div>
                                        <div >
                                            <a className='meetup-link' href={meetup.link}>Meetup</a>
                                        </div>
                                    </div>
                                        <div>
                                            <Talks
                                             filter={(talk) => talk.meetupId === meetup.meetupId}
                                             include = {['Speaker', 'Talk', 'Status', 'Owner']}
                                             styling='table-header-meetups-page'
                                            />
                                        </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Meetups