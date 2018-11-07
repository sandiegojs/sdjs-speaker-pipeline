import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
            <Navbar />
            </div>
        )
    }
}

export default AdminLogin;