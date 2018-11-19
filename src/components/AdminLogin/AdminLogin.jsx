import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { updateUsername, updatePassword, postLogin, postLoginPersist, checkToken, rememberMe } from './AdminLoginActions';
import Navbar from '../Navbar/Navbar';

class AdminLogin extends Component {
	constructor(props) {
		super(props);

		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleRemember = this.handleRemember.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
	}

	componentDidMount() {
		const { dispatch, accessToken } = this.props;
		dispatch(checkToken(accessToken));
	}

	componentDidUpdate() {
		const { dispatch, accessToken } = this.props;
		dispatch(checkToken(accessToken));
	}

	handleUsername(e) {
		const { dispatch } = this.props;
		dispatch(updateUsername(e.target.value));
	}

	handlePassword(e) {
		const { dispatch } = this.props;
		dispatch(updatePassword(e.target.value))
	}

	handleRemember(e) {
		const { dispatch } = this.props;
		let checked;
		e.target.checked ? checked = true : checked = false;
		dispatch(rememberMe(checked));
	}

	submitLogin(e) {
		e.preventDefault();
		const { dispatch, remember, username, password } = this.props;
		if (remember) dispatch(postLoginPersist({ username, password, ttl: 60 * 60 }));
		else dispatch(postLogin({ username, password, ttl: 60 * 60 }));
	}

	render() {
		const { username, password, authorized } = this.props;
		if (authorized) return <Redirect push to='/Admin/Meetups' />
		return (
			<div>
				<Navbar />
				<div className='signUp-container'>
					<div className='form-container login'>
						<form onSubmit={this.submitLogin}>
							<h3>SDJS Admin Login</h3>
							<div className="container">
								<label htmlFor="username"><b>Username</b></label>
								<input type="text" placeholder="Username" id='username' name="username" value={username} onChange={this.handleUsername} required />
								<label htmlFor="password"><b>Password</b></label>
								<input type="password" placeholder="Password" id='password' name="password" value={password} onChange={this.handlePassword} required />
								<button type="submit" id='submit' className='btn'>Login</button>
								<label id='remember'>
									<input type="checkbox" name="remember" onChange={this.handleRemember} /> Remember me
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
