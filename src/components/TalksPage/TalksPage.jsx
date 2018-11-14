import React, { Component } from 'react';
import Talks from '../Talks';
import PastTalks from '../PastTalks';
import AdminNav from '../AdminNav/AdminNav';

class TalksPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AdminNav />
                <div className='talks-page-container'>
                    <div className='talks-allTalks'>
                        <h1>All Talks</h1>
                        <div className='talk-component-container'>
                            <Talks 
                            styling='talk-component-on-talks-page'
                            />
                        </div>
                    </div>
                    <div className='talks-pastTalks'>
                        <h1>Past Talks</h1>
                        <div className='talk-component-container'>
                            <PastTalks
                            styling='talk-component-on-talks-page'
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TalksPage;