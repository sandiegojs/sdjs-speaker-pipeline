import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                {console.log('hello world')}
                <Link to="/AdminDashboard">
                    <button className="btn">Home</button>
                </Link>
            </div>
        )
    }
}

export default Home;