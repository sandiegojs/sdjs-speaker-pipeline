import React, { Component } from 'react';
import { Field } from 'react-redux-form';

export default class OrganizersEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      username: null,
      email: null,
      password: null,
      phone: props.admin.phone,
    };

    this.handleAdminUpdate = this.handleAdminUpdate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    e.preventDefault();
    const jsonObject = {};
    for (const property in this.state) {
      if (this.state[property] && property !== 'id') {
        jsonObject[property] = this.state[property];
      }
    }
    if (Object.keys(jsonObject).length === 0) {
      return this.props.toggleEdit();
    }
    this.props.onSubmit(this.state.id, this.props.index, jsonObject);
  }

  handleAdminUpdate(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const { admin, toggleEdit } = this.props;
    return (
      <div className="organizer-edit-section">
        <form id="organizer-edit-form" onSubmit={this.handleUpdate}>
          <i className="fas fa-times" name={admin.id} onClick={toggleEdit} />
          <Field model="user.name">
            <label htmlFor="username">
              Name:
              <input
                id="username"
                type="text"
                value={admin.username}
                onChange={this.handleAdminUpdate}
              />
            </label>
          </Field>
          <Field model="user.admin-email">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                value={admin.email}
                onChange={this.handleAdminUpdate}
              />
            </label>
          </Field>
          <Field model="user.admin-phone">
            <label htmlFor="phone">
              Phone:
              <input
                type="tel"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder={admin.phone.replace(
                  /(\d{3})-?(\d{3})-?(\d{4})/,
                  '$1-$2-$3',
                )}
                value={this.state.phone.replace(
                  /(\d{3})-?(\d{3})-?(\d{4})/,
                  '$1-$2-$3',
                )}
                format="### ### ####"
                onChange={this.handleAdminUpdate}
              />
            </label>
          </Field>
          <Field model="user.admin-password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                placeholder="********"
                onChange={this.handleAdminUpdate}
              />
            </label>
          </Field>
          <button className="btn" type="submity" id="admin-submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}
