import React from 'react';
import { withRouter } from "react-router";

const footer = props => {
    const { location } = props;
    return (
        <div className='footer' >
            <div className='top-links'>
                <a href='https://www.sandiegojs.org/contact' className= 'footer-item'>
                    CONTACT US / FEEDBACK
                    </a>
                <a href='https://www.sandiegojs.org/contribute' className= 'footer-item'>
                    CONTRIBUTE
                    </a>
                <a href='https://www.sandiegojs.org/events' className= 'footer-item'>
                    PAST EVENTS
                    </a>
                <a href='https://www.sandiegojs.org/code-of-conduct' className= 'footer-item'>
                    CODE OF CONDUCT
                    </a>
            </div>
            <div className='bottom-link'>

                  <p className='webflow'>
                    Site created with and sponsored by <a href='https://webflow.com' className={location.pathname === '/Admin/Login' ? 'nav-item w--current' : 'nav-item'}>
                        Webflow
                    </a>
                </p>
            </div>
        </div>
    )
}

export default withRouter(footer);
