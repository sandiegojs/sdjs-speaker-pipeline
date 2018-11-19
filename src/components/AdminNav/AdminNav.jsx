import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { postLogout } from './AdminNavActions';
import { checkToken } from '../AdminLogin/AdminLoginActions';

class AdminNavbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
		const { dispatch, accessToken } = this.props;
		dispatch(checkToken(accessToken));
	}

    handleLogout() {
        const { dispatch, accessToken } = this.props;
        dispatch(postLogout(accessToken))
    }

    render() {
        const { location } = this.props;
        return (
            <div className='navbar'>
                <img className='logo' src='https://uploads-ssl.webflow.com/5717c4de40b3bdeb02777ff4/598129e0c2a8fb000172a22e_Full%20Color.png' />
                <div className='nav-items' >
                    <Link to='/Admin/Meetups' className={location.pathname === '/Admin/Meetups' ? 'nav-item w--current' : 'nav-item'}>Meetups</Link>
                    <Link to='/Admin/Talks' className={location.pathname === '/Admin/Talks' ? 'nav-item w--current' : 'nav-item'}>Talks</Link>
                    <Link to='/Organizers' className={location.pathname === '/Organizers' ? 'nav-item w--current' : 'nav-item'}>Organizers</Link>
                    <Link to='/Account' className={location.pathname === '/Account' ? 'nav-item w--current' : 'nav-item'}>Account</Link>
                    <Link to='/' onClick={this.handleLogout} className='nav-item'>LOG OUT</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminNavbar);
