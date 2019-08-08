import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

const Navbar = props => {
    const { location } = props;
    return (
        <div className='home-nav'>
            <div className='navbar'>

                <a href= "https://www.sandiegojs.org/">
                    <img className='logo' src='https://uploads-ssl.webflow.com/5717c4de40b3bdeb02777ff4/598129e0c2a8fb000172a22e_Full%20Color.png'/></a>

                <div className='nav-items' >
                    <Link to='/' className={location.pathname === '/' ? 'nav-item w--current' : 'nav-item'}>
                        SPEAK
                    </Link>
                    <Link to='/SignUp' className={location.pathname === '/SignUp' ? 'nav-item w--current' : 'nav-item'}>
                        SIGN UP
                    </Link>
                    <a href='https://www.sandiegojs.org/connect' className={location.pathname === '/Connect' ? 'nav-item w--current' : 'nav-item'}>
                        CONNECT
                    </a>
                    <a href='https://www.sandiegojs.org/shirts' className={location.pathname === '/Shirts' ? 'nav-item w--current' : 'nav-item'}>
                        SHIRTS
                    </a>
                    <a href='https://www.sandiegojs.org/learn' className={location.pathname === '/Learn' ? 'nav-item w--current' : 'nav-item'}>
                        LEARN
                    </a>
                    <a href='https://www.sandiegojs.org/jobs' className={location.pathname === '/Jobs' ? 'nav-item w--current' : 'nav-item'}>
                        JOBS
                    </a>
                    <Link to='/Admin/Login' className={location.pathname === '/Admin/Login' ? 'nav-item w--current' : 'nav-item'}>
                        ADMIN
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar);
