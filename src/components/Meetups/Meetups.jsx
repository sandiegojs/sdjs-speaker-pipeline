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
        return(
            <div>
                <h1>Meetups</h1>
            </div>
        )
    }
}

export default Meetups