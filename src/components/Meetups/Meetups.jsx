import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { getEvents } from './MeetupsActions';

class Meetups extends Component {
    constructor(props) {
      super(props);
    }
  
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(getEvents());
    }

    render(){
        const { eventInfo } = this.props;
        return(
            <div>
                <div className='meetups'>
                    <div>
                        <h1>Meetups</h1>
                        <div>
                            {eventInfo && eventInfo.map(meetup => (
                                <div key={meetup.venue.id}>
                                    <div className='header'>
                                        <div>{meetup.date}</div>
                                        <div>{meetup.name}</div>
                                        <div >
                                            <a className='meetup-link' href={meetup.link}>Meetup</a>
                                        </div>
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