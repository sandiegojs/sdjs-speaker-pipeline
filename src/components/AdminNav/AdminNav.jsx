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
                    <Link to='/AdminHome' className={location.pathname === '/AdminHome' ? 'nav-item w--current' : 'nav-item' }>
                         ADMIN HOME
                    </Link>
                    <Link to='/Talks' className={location.pathname === '/Talks' ? 'nav-item w--current' : 'nav-item' }>
                        TALKS
                    </Link>
                    <Link to='/Organizers' className={location.pathname === '/Organizers' ? 'nav-item w--current' : 'nav-item' }>
                        ORGANIZERS
                    </Link>
                    <Link to='/Account' className={location.pathname === '/Account' ? 'nav-item w--current' : 'nav-item' }>
                        ACCOUNT
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminNavbar);


