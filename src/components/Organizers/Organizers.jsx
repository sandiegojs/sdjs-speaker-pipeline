import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AdminNav from '../AdminNav/AdminNav';
import { Field } from 'react-redux-form';
import {
    addAdmin,
    deleteAdmin,
    getAdmins,
    onChange,
    patchAdmin,
    toggleEdit,
} from './OrganizersActions';
import OrganizersEdit from '../OrganizersEdit/OrganizersEdit';

class Organizers extends Component {
    constructor(props) {
        super(props);

        this.addAdmin = this.addAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    addAdmin(e) {
        e.preventDefault();
        const { newAdminName, newAdminEmail, newAdminPhone, newAdminPassword, dispatch, accessToken } = this.props;
        dispatch(addAdmin(newAdminName, newAdminEmail, newAdminPhone, newAdminPassword, accessToken));
    }
    componentDidMount() {
        const { dispatch, accessToken } = this.props;
        dispatch(getAdmins(accessToken));
    }

    handleChange(e) {
        const { dispatch } = this.props;
        dispatch(onChange(e.target.name, e.target.value))
    }


    handleDelete(e) {
        const { dispatch, accessToken } = this.props;
        dispatch(deleteAdmin(e.target.name, accessToken))
    }
    handleUpdate(id, index, obj) {
        const { dispatch, accessToken } = this.props;

        dispatch(patchAdmin(id, index, obj, accessToken))
    }
    toggleEdit(e) {
        const { adminList, dispatch } = this.props;
        const index = adminList.findIndex(admin => {
            return admin.id == e.target.name
        })
        dispatch(toggleEdit(index));
    }

    render() {
        const { adminList, newAdminPhone, newAdminEmail, newAdminPassword, newAdminName, authorized } = this.props;
        if (!authorized) return <Redirect push to= '/Admin/Login' />
        return (

            <div>
                < AdminNav />
                <div className='form-container'>
                    <form onSubmit={this.addAdmin}>
                        <h3 className='add-admin-title'>Add Other Admins Contact Info</h3>
                        <Field model='user.name'>
                            <label htmlFor='admin-name'>Name: </label>
                            <input name='newAdminName' id='newAdminName' placeholder='John Smith' type='text' value={newAdminName} onChange={this.handleChange} required />
                        </Field >
                        <Field model='user.admin-email'>
                            <label htmlFor='admin-email'>Email: </label>
                            <input type="email" placeholder='iamJohnSmith@email.com' id="newAdminEmail" name="newAdminEmail" value={newAdminEmail} required onChange={this.handleChange} />
                        </Field>
                        <Field model='user.admin-phone'>
                            <label htmlFor='admin-phone'>Phone Number: </label>
                            <input type="tel" name="newAdminPhone" placeholder='123-456-7890'  required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={newAdminPhone.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3')} format="### ### ####" onChange={this.handleChange} />
                        </Field>
                        <Field model='user.admin-password'>
                            <label htmlFor='admin-password'>Password: </label>
                            <input type="password" id="newAdminPassword" name="newAdminPassword" placeholder='********'  required value={newAdminPassword} onChange={this.handleChange} />
                        </Field>
                        <div>
                            <button id='btn' className='btn'>Submit!</button>
                        </div>
                    </form>
                </div>




                <div>
                    {adminList && adminList.map((admin, index) => {

                        if (admin.isEditing) {
                            return (
                                <OrganizersEdit key={admin.id} index={index} admin={admin} id={admin.id} onSubmit={this.handleUpdate} toggleEdit={this.toggleEdit}/>
                            )
                        }
                        return (
                            <div key={admin.id}>
                                <div >
                                    <div className='admin-map-content'>
                                        <div> {admin.username}</div>
                                        <div> {admin.email}</div>
                                        <div> {admin.phone.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3')}</div>
                                        <div >
                                            <img
                                                name={admin.id}
                                                className="edit-icon"
                                                onClick={this.toggleEdit}
                                                src={`/pics/edit-icon.png`}
                                            />
                                            <img
                                                name={admin.id}
                                                className="trash-icon"
                                                onClick={this.handleDelete}
                                                src={`/pics/trash-icon.png`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
    
        )
    }
}

export default Organizers;
