import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Field } from 'react-redux-form';
import AdminNav from '../AdminNav';
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
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    const { dispatch, accessToken } = this.props;
    dispatch(getAdmins(accessToken));
  }

  addAdmin(e) {
    e.preventDefault();
    const {
      newAdminName,
      newAdminEmail,
      newAdminPhone,
      newAdminPassword,
      dispatch,
      accessToken,
    } = this.props;
    dispatch(
      addAdmin(
        newAdminName,
        newAdminEmail,
        newAdminPhone,
        newAdminPassword,
        accessToken,
      ),
    );
  }

  handleChange(e) {
    const { dispatch } = this.props;
    dispatch(onChange(e.target.name, e.target.value));
  }

  handleDelete(e) {
    const { dispatch, accessToken } = this.props;
    dispatch(deleteAdmin(e.target.getAttribute('name'), accessToken));
  }

  handleUpdate(id, index, obj) {
    const { dispatch, accessToken } = this.props;
    dispatch(patchAdmin(id, index, obj, accessToken));
  }

  toggleEdit(e) {
    const { adminList, dispatch } = this.props;
    const index = adminList.findIndex(admin => (
      admin.id === e.target.getAttribute('name')
    ));
    dispatch(toggleEdit(index));
  }

  render() {
    const {
      adminList,
      newAdminPhone,
      newAdminEmail,
      newAdminPassword,
      newAdminName,
      authorized,
    } = this.props;
    if (!authorized) return <Redirect push to="/Admin/Login" />;
    return (
      <div className="top-div">
        <AdminNav />
        <div className="organizer-container">
          <div className="organizer-container-child">
            <h1>Organizers</h1>
            <h3 className="add-admin-title">Add Other Admins Contact Info</h3>
            <form id="organizer-form" onSubmit={this.addAdmin}>
              <Field model="user.name">
                <label htmlFor="admin-name">
                  Name:
                  <input
                    name="newAdminName"
                    type="text"
                    value={newAdminName}
                    onChange={this.handleChange}
                    required
                  />

                </label>
              </Field>
              <Field model="user.admin-email">
                <label htmlFor="admin-email">
                  Email:
                  <input
                    type="email"
                    name="newAdminEmail"
                    value={newAdminEmail}
                    required
                    onChange={this.handleChange}
                  />

                </label>
              </Field>
              <Field model="user.admin-phone">
                <label htmlFor="admin-phone">
                  Phone Number:
                  <input
                    type="tel"
                    name="newAdminPhone"
                    required
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={newAdminPhone.replace(
                      /(\d{3})-?(\d{3})-?(\d{4})/,
                      '$1-$2-$3',
                    )}
                    format="### ### ####"
                    onChange={this.handleChange}
                  />
                </label>
              </Field>
              <Field model="user.admin-password">
                <label htmlFor="admin-password">
                  Password:
                  <input
                    type="password"
                    name="newAdminPassword"
                    value={newAdminPassword}
                    required
                    onChange={this.handleChange}
                  />

                </label>
              </Field>
              <div>
                <button className="btn" type="submit">Submit!</button>
              </div>
            </form>
          </div>

          <div className="organizer-edit-admins">
            <h3>Current Organizers</h3>
            <div className="organizer-display-container">
              {adminList && adminList.map((admin, index) => {
                if (admin.isEditing) {
                  return (
                    <OrganizersEdit
                      key={admin.id}
                      index={index}
                      admin={admin}
                      id={admin.id}
                      onSubmit={this.handleUpdate}
                      toggleEdit={this.toggleEdit}
                    />
                  );
                }
                return (
                  <div key={admin.id}>
                    <div>
                      <div className="organizer-display-section">
                        <div className="organizer-display-div" id="name">
                          {' '}
                          {admin.username}
                        </div>
                        <div className="organizer-display-div">
                          {' '}
                          {admin.email}
                        </div>
                        <div className="organizer-display-div">
                          {' '}
                          {admin.phone.replace(
                            /(\d{3})-?(\d{3})-?(\d{4})/,
                            '$1-$2-$3',
                          )}
                        </div>
                        <div>
                          <i
                            className="far fa-edit"
                            name={admin.id}
                            onClick={this.toggleEdit}
                          />
                          <i
                            className="fas fa-trash-alt"
                            name={admin.id}
                            onClick={this.handleDelete}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Organizers;
