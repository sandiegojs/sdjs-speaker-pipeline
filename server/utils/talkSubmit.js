'use strict';

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
						const index = meetups.findIndex((item) => item.date == date);
						let name = meetups[index].name;
						let details = meetups[index].description;
						let meetupId = meetups[index].meetupId;
						if (index === -1 )
						return reject(new Error('NO meetup with that date found!'));
						Event.findOrCreate({date, name, details, meetupId})
							.then(event => {
								let eventId = event[0].id
								Talk.create( { ...talkInfo, speakerId, eventId})
									.then(talk => resolve(talk))
									.catch(err => console.log(err))
							})
							.catch(err => reject(err))
					})
					.catch(err => reject(err))
			})
			.catch(err => reject(err))
	})
}

module.exports = { talkSubmit };
