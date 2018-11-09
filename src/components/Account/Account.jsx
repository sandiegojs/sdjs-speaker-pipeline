import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav';

class Account extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                < AdminNav />
                account page
            </div>
        )
    }
}

export default Account;