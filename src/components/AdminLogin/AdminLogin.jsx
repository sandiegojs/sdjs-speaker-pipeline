import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <Link to="/Home">
                    <button className="btn">Home</button>
                </Link>
            </div>
        )
    }
}

export default AdminLogin;