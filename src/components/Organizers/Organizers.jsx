import React, { Component } from 'react';
import AdminNav from '../AdminNav/AdminNav';
import { Field } from 'react-redux-form';
import {
    addAdmin,
    adminChangeInput,
    adminUpdate,
    deleteAdmin,
    editAdmin,
    getAdmins,
    onChange,
    patchAdmin,
    toggleEdit,
    updateAdminList,
    updateAdminInfo,
    resetState
} from './OrganizersActions';
import OrganizersEdit from '../OrganizersEdit/OrganizersEdit';

class Organizers extends Component {
    constructor(props) {
        super(props);

        this.addAdmin = this.addAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleMapChane = this.handleMapChange.bind(this);
        this.handleMapDelete = this.handleMapDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleAdminChange = this.handleAdminChange.bind(this);
        this.handleAdminUpdate = this.handleAdminUpdate.bind(this);

    }

    addAdmin(e) {
        e.preventDefault();
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            adminTempPw = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            adminTempPw += charset.charAt(Math.floor(Math.random() * n));
        }
        let realm = 'string'
        const { newAdminName, newAdminEmail, newAdminPhone, dispatch, accessToken } = this.props;
        dispatch(addAdmin(realm, newAdminName, newAdminEmail, newAdminPhone, adminTempPw, accessToken));
    }
    componentDidMount() {
        const { dispatch, accessToken } = this.props;
        dispatch(getAdmins(accessToken));
    }

    handleAdminChange(e) {
        const { adminList, dispatch } = this.props;
        const index = adminList.findIndex(admin => {
            return admin.id == e.target.name
        })
        dispatch(adminUpdate(index));
    }
    handleAdminUpdate(e) {
        const { dispatch } = this.props;
        dispatch(adminChangeInput(e.target.name, e.target.id, e.target.value))
    }

    handleChange(e) {
        const { dispatch } = this.props;
        dispatch(onChange(e.target.name, e.target.value))
    }


    handleDelete(e) {
        const { dispatch, accessToken } = this.props;
        dispatch(deleteAdmin(e.target.name, accessToken))
    }

    handleEdit(e) {
        const { dispatch, accessToken } = this.props;
        dispatch(editAdmin(e.target.name, accessToken));
        this.toggleEdit()
    }

    handleMapChange({ index, name, email, phone, password }) {
        const { adminList, dispatch } = this.props;
        adminList = [...adminList];
        adminList[index] = { index, name, email, phone, password };
        dispatch(updateAdminList(newAdmins))
    }

    handleMapDelete({ index }) {
        const { adminList, dispatch } = this.props;
        adminList = [...adminList];
        adminList.splice(index, 1);
        dispatch(updateAdminList(newAdmins))
    }

    handleUpdate(id, index, obj) {
        const { dispatch, accessToken } = this.props;

        dispatch(patchAdmin(id, index, obj, accessToken))
    }

    handleSubmit(e) {
        const { adminName, adminEmail, adminPhone, dispatch } = this.props;
        dispatch(updateAdminInfo(adminName, adminEmail, adminPhone));
    }
    toggleEdit(e) {
        const { adminList, dispatch } = this.props;
        const index = adminList.findIndex(admin => {
            return admin.id == e.target.name
        })
        dispatch(toggleEdit(index));
    }

    render() {
        const { adminList, newAdminPhone, newAdminEmail, newAdminName } = this.props;
        return (

            <div>
                < AdminNav />
                <div className='form-container'>
                    <form onSubmit={this.addAdmin}>
                        <h3 className='add-admin-title'>Add Other Admins Contact Info</h3>
                        <Field model='user.name'>
                            <label htmlFor='admin-name'>Name: </label>
                            <input name='newAdminName' placeholder='John Smith' type='text' value={newAdminName} onChange={this.handleChange} required />
                        </Field >
                        <Field model='user.admin-email'>
                            <label htmlFor='admin-email'>Email: </label>
                            <input type="email" placeholder='iamJohnSmith@email.com' name="newAdminEmail" value={newAdminEmail} required onChange={this.handleChange} />
                        </Field>
                        <Field model='user.admin-phone'>
                            <label htmlFor='admin-phone'>Phone Number: </label>
                            <input type="tel" name="newAdminPhone" placeholder='123-456-7890'  required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={newAdminPhone.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3')} format="### ### ####" onChange={this.handleChange} />
                        </Field>
                        <div>
                            <button className='btn'>Submit!</button>
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
