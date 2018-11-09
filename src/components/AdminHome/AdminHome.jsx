import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav';

class AdminHome extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                < AdminNav />
                admin home
            </div>
        )
    }
}

export default AdminHome;