import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { updateUsername, updatePassword, postLogin } from './AdminLoginActions';
import Navbar from '../Navbar/Navbar';

class AdminLogin extends Component {
	constructor(props) {
		super(props);

		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.submitLogin    = this.submitLogin.bind(this);
	}

	handleUsername(e) {
    const { dispatch } = this.props;
    dispatch(updateUsername(e.target.value));
  }

  handlePassword(e) {
    const { dispatch } = this.props;
    dispatch(updatePassword(e.target.value))
  }

  submitLogin(e) {
    e.preventDefault();
    const { dispatch, username, password } = this.props;
    dispatch(postLogin({ username, password, ttl: 60 * 60 }));
  }

	render() {
		if (this.props.token) return <Redirect push to='/admin/talks' />;
		const { username, password } = this.props;
		return (
			<div>
				<Navbar />
				<div className='signUp-container'>
					<div className='form-container login'>
						<form onSubmit={this.submitLogin}>
							<h3>SDJS Admin Login</h3>
							<div className="container">
								<label for="username"><b>Username</b></label>
								<input type="text" placeholder="Username" name="username" value={username} onChange={this.handleUsername} required/>
								<label for="password"><b>Password</b></label>
								<input type="password" placeholder="Password" name="password" value={password} onChange={this.handlePassword} required/>
								<button type="submit" className='btn'>Login</button>
								<label id='remember'>
									<input type="checkbox" name="remember"/> Remember me
								</label>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default AdminLogin;
