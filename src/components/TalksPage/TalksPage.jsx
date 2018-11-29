import React, { Component } from 'react';
import { handleOwnerFilter } from './TalksPageActions';
import { getAdmins } from '../Organizers/OrganizersActions'
import Talks from '../Talks';
import PastTalks from '../PastTalks';
import AdminNav from '../AdminNav';

class TalksPage extends Component {
    constructor(props) {
        super(props);
        this.handleOwnerFilter = this.handleOwnerFilter.bind(this);
    }

    componentDidMount() {
        const { dispatch, accessToken } = this.props;
        dispatch(getAdmins(accessToken));
    }

    handleOwnerFilter(e) {
        const { dispatch } = this.props;
        dispatch(handleOwnerFilter(e.target.value));
    }

    render() {
        const { selectedOwner, adminList } = this.props;
        let filterProp = (talk) => talk
        if (selectedOwner !== '') {
            filterProp = (talk) => talk.owner == selectedOwner
        }

        return (
            <div className='top-div'>
                <AdminNav />
                <div className='talks-page-container'>
                    <div className='talks-allTalks'>
                        <h1>All Talks</h1>
                        <div className='talks-owner-filter'>
                            <select onChange={this.handleOwnerFilter}>
                                <option value=''>Filter By Owner</option>
                                <option value=''>All</option>
                                {adminList &&
                                    adminList.map((admin, i) => <option key={i} value={admin.username}>{admin.username}</option>)}
                                <option value='None'>None</option>
                            </select>
                        </div>
                        <div className='talk-component-container'>
                            <Talks
                                styling='talk-component-on-talks-page'
                                filter={filterProp}
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
