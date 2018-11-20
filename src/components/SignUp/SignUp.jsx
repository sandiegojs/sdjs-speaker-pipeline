import React, { Component } from 'react';
import { Field } from 'react-redux-form';
import { Redirect } from 'react-router';
import {
	talkSubmit,
	getDates,
	updateSpeakerName,
	updateEmail,
	updatePhone,
	updateDate,
	updateTopic,
	updateDescription,
} from './SignUpActions'
import Navbar from '../Navbar/Navbar';

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
		console.log('this is date right after speaker submit: ', date)
		dispatch(talkSubmit({ speakerName, speakerEmail, phone, speakerEmail },
			 {
				topic, description
			},
			date,
		));
	}

	render() {
		const { events, phone, submitted, speakerName, speakerEmail } = this.props;
		if (submitted == true) {
			return <Redirect push to='/Thankyou' />
		  }
			return (
				<div>
					<Navbar />
					<div className='signUp-container'>
						<div className='form-container'>
							<form onSubmit={this.submitSpeaker}>
								<h3>Speaker Registration</h3>
								<Field model='speakerName'>
									<label htmlFor='speaker-name'>Name: </label>
									<input name='speakerName' id='speakerName' value={speakerName} type='text'  onChange={this.handleSpeakerName} required />
								</Field >
								<Field model='speakerEmail'>
									<label htmlFor='speaker-email'>Email: </label>
									<input type="email" id="speakerEmail" name="speakerEmail" value={speakerEmail} required onChange={this.handleEmail} />
								</Field>
								<Field model='phone'>
									<label htmlFor='speaker-phone'>Phone Number: </label>
									<input type="tel" name="phone" id='speakerPhone' required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phone.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3')}format="### ### ####" onChange={this.handlePhone} />
								</Field>
								<div>
									<label htmlFor='event-date'>Date Requested: </label>
									<select name='date' id='event-date' type='select' required onChange={this.handleDate}>
										<option>Select a Date</option>
										{events && events.map(event => (
											<option key={event.date} >{event.date}&nbsp;&nbsp;-&nbsp;&nbsp;{event.name}</option>
										))}
									</select>
								</div>
								<Field model='topic'>
									<label htmlFor='topic'>Topic:</label>
									<input name='topic' id='topic' type='text' required onChange={this.handleTopic} />
								</Field>
								<Field model='description'>
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

export default SignUp;
