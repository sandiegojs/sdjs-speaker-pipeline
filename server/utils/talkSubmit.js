const app = require('../server');
const { getMeetups } = require('./getMeetups');

function talkSubmit(speakerInfo, talkInfo, date) {
	return new Promise((resolve, reject) => {
		const { Talk, Speaker, Event } = app.models;
		Speaker.create(speakerInfo)
			.then(response => {
				let speakerId = response.id
				getMeetups()
					.then(meetups => {
						const index = meetups.findIndex((item) => {
							return item.date == date
						})
						let name = meetups[index].name;
						let details = meetups[index].description;
						let meetupId = meetups[index].meetupId;
						Event.findOrCreate({date, name, details, meetupId})
							.then(event => {
								console.log('event: ', event)
								let eventId = event[0].id
								Talk.create( { ...talkInfo, speakerId, eventId})
									.then(talk => {
										console.log('talks: ', talk)
										return resolve(talk)
									})
									.catch(err => console.log(err))
							})
							.catch(err => console.log(err))
					})
					.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
	})
}

module.exports = { talkSubmit };
