import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav';

class Organizers extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                < AdminNav />
                orgainizers
            </div>
        )
    }
}

export default Organizers;