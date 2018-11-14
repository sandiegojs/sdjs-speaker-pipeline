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
        console.log('create password')
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            adminTempPw = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            adminTempPw += charset.charAt(Math.floor(Math.random() * n));
        }
        console.log('this is admintempw', adminTempPw)
        let realm = 'string'
        const { newAdminName, newAdminEmail, newAdminPhone, dispatch } = this.props;
        dispatch(addAdmin(realm, newAdminName, newAdminEmail, newAdminPhone, adminTempPw));
    }
    componentDidMount() {
        console.log('compoent did mount')
        const { dispatch } = this.props;
        dispatch(getAdmins());
    }

    handleAdminChange(e) {
        console.log('handle  admin change fired')
        const { adminList, dispatch } = this.props;
        const index = adminList.findIndex(admin => {
            return admin.id == e.target.name
        })
        console.log('this is index in handleAdminChange', index)
        console.log('this is adminList[index] index in handleAdminChange', adminList[index])
        dispatch(adminUpdate(index));
    }
    handleAdminUpdate(e) {
        console.log('handle admin update triggered')
        console.log('this is name" ', e.target.name, 'this is id: ', e.target.id, 'this is value: ', e.target.value)
        const { dispatch } = this.props;
        dispatch(adminChangeInput(e.target.name, e.target.id, e.target.value))
    }

    handleChange(e) {
        console.log('handle change fired')
        const { dispatch } = this.props;
        dispatch(onChange(e.target.name, e.target.value))
    }


    handleDelete(e) {
       // debugger;
        const { dispatch } = this.props;
        console.log('this is e.target.name',e.target.name)
        dispatch(deleteAdmin(e.target.name))
    }

    handleEdit(e) {
        console.log('handle edit triggered')
        const { dispatch } = this.props;
        dispatch(editAdmin(e.target.name));
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
        const { dispatch } = this.props;

        dispatch(patchAdmin(id, index, obj))
    }

    handleSubmit(e) {
        const { adminName, adminEmail, adminPhone, dispatch } = this.props;
        dispatch(updateAdminInfo(adminName, adminEmail, adminPhone));
    }
    toggleEdit(e) {
        console.log('toggle edit triggered')
        const { adminList, dispatch } = this.props;
        const index = adminList.findIndex(admin => {
            return admin.id == e.target.name
        })
        console.log('this is adminList index', index)
        console.log('this is adminList[index] index', adminList[index])
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
                            console.log('this is admin.phone', admin.phone)
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





    
        /* {adminList && adminList.map(admin => {

            
            return (
                <div key={adminList.id}>
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
                    {this.renderEdit()}
                </div>
            ) 
        })}
        </div>
    )
}
    renderEdit() {
        const { adminList, isEditing } = this.props;

        if (!isEditing) {
            console.log('editing is false')
            return null;
        }
        return (
        <div>
            {adminList && adminList.map(admin => {
                console.log('editing is true, should render out edit')
                    return (
                        <div key={admin.id} className='admin-map-content'>
                        <Field model='user.name'>
                            <label htmlFor='admin-name'>Name: </label>
                            <input name='adminName' id='admin-firstname' type='text' value={admin.username} onChange={this.handleChange} />
                        </Field>
                        <Field model='user.admin-email'>
                            <label htmlFor='admin-email'>Email: </label>
                            <input type="email"  name="adminEmail" value={admin.email} onChange={this.handleChange} />
                        </Field>
                        <Field model='user.admin-phone'>
                            <label htmlFor='admin-phone'>Phone Number: </label>
                            <input type="tel" name="adminPhone" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={admin.phone.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3')} format="### ### ####" onChange={this.handleChange} />
                        </Field>
                            <div>
                                <button className='btn' id='admin-submit' onClick={this.handleSubmit}>Update Changes</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>) */

    
    )
    }
}

export default Organizers;
