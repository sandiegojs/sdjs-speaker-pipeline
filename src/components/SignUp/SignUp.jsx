import React, { Component } from 'react';
import { Field } from 'react-redux-form';
import { connect } from 'react-redux';
import {
	updateSpeakerName,
	updateEmail,
	updatePhone,
	updateDate,
	updateTopic,
	updateDescription,
	talkSubmit,
	getDates,
} from './SignUpActions'
import Navbar from '../Navbar/Navbar';
import moment from 'moment';


class SignUp extends Component {
	constructor(props) {
		super(props);

		this.handleSpeakerName 	= this.handleSpeakerName.bind(this);
		this.handleEmail 		= this.handleEmail.bind(this);
		this.handlePhone 		= this.handlePhone.bind(this);
		this.handleDate 		= this.handleDate.bind(this);
		this.handleTopic 		= this.handleTopic.bind(this);
		this.handleDescription 	= this.handleDescription.bind(this);
		this.submitSpeaker 		= this.submitSpeaker.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(getDates());
	}

	handleSpeakerName(e) {
		const { dispatch } = this.props;
		dispatch(updateSpeakerName(e.target.value));
	}

	handleEmail(e) {
		const { dispatch } = this.props;
		dispatch(updateEmail(e.target.value));
	}

	handlePhone(e) {
		const { dispatch } = this.props;
		dispatch(updatePhone(e.target.value));
	}

	handleDate(e) {
		const { dispatch } = this.props;
		dispatch(updateDate(e.target.value));
	}

	handleTopic(e) {
		const { dispatch } = this.props;
		dispatch(updateTopic(e.target.value));
	}

	handleDescription(e) {
		const { dispatch } = this.props;
		dispatch(updateDescription(e.target.value));
	}

	submitSpeaker(e) {
		e.preventDefault();
		const { dispatch, speakerName, speakerEmail, date, topic, phone, description } = this.props;
		let zone = "America/Los_Angeles"
		dispatch(talkSubmit({ speakerName, speakerEmail, phone, speakerEmail },
			 {
				topic, description
			},
			date,
		));

	}

	render() {
		const { events, phone } = this.props;
			return (
				<div>
					<Navbar />
					<div className='signUp-container'>
						<div className='form-container'>
							<form onSubmit={this.submitSpeaker}>
								<h3>Speaker Registration</h3>
								<Field model='user.name'>
									<label htmlFor='speaker-name'>Name: </label>
									<input name='speaker-name' placeholder='John Smith' id='speaker-firstname' type='text'  onChange={this.handleSpeakerName} required />
								</Field >
								<Field model='user.speaker-email'>
									<label htmlFor='speaker-email'>Email: </label>
									<input type="email" placeholder='iamJohnSmith@email.com' name="speaker-email" required onChange={this.handleEmail} />
								</Field>
								<Field model='user.phone'>
									<label htmlFor='speaker-phone'>Phone Number: </label>
									{console.log('this is phone', phone)}
									<input type="tel" name="speaker-email" placeholder='123-456-7890' required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phone.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3')}format="### ### ####" onChange={this.handlePhone} />
								</Field>
								<div>
									<label htmlFor='event-date'>Date Requested: </label>
									<select name='event-date' id='event-date' type='select' required onChange={this.handleDate}>
										{events && events.map(event => (
											<option key={event.date}>{event.date}</option>
										))}
									</select>
								</div>
								<Field model='user.topic'>
									<label htmlFor='topic'>Topic:</label>
									<input name='topic' id='topic' type='text' required onChange={this.handleTopic} />
								</Field>
								<Field model='user.description'>
									<label htmlFor='description'>Description: </label>
									<textarea name='description' id='description' type='text' required onChange={this.handleDescription} />
								</Field>
								<div>
									<button className='btn' id='speaker-submit'>Submit!</button>
								</div>
							</form>
						</div>
					</div>
				</div>

			)
	}
}

const selector = (state) => ({ user: state.user });
export default connect(selector)(SignUp);
