import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

class AdminNavbar extends Component {
    constructor(props) {
        super(props);
    }
  
        
    render() {
        const { location } = this.props;
        
       
        return (
            <div className='navbar'>
                
                    <img className='logo' src='https://tinyurl.com/yb9xzoo5' />
                
                <div className='nav-items' >
                    <Link to='/Admin/Meetups' className={location.pathname === '/Admin/Meetups' ? 'nav-item w--current' : 'nav-item' }>
                         Meetups
                    </Link>
                    <Link to='/Admin/Talks' className={location.pathname === '/Admin/Talks' ? 'nav-item w--current' : 'nav-item' }>
                        Talks
                    </Link>
                    <Link to='/Organizers' className={location.pathname === '/Organizers' ? 'nav-item w--current' : 'nav-item' }>
                        Organizers
                    </Link>
                    <Link to='/Account' className={location.pathname === '/Account' ? 'nav-item w--current' : 'nav-item' }>
                        Account
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminNavbar);


