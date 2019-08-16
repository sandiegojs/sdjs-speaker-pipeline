const app = require('../server');
const { getMeetups } = require('./getMeetups');

function talkSubmit(speakerInfo, talkInfo, date) {
	const { Talk, Speaker, Event } = app.models;
	return getMeetups()
	.then(meetups => {
		const index = meetups.findIndex((item) => item.date == date);
		let name = meetups[index].name;
		let details = meetups[index].description;
		let meetupId = meetups[index].meetupId;
		if (index === -1)
		return reject(new Error('NO meetup with that date found!'));
		return Promise.all([
			Event.findOrCreate({
				date, name, details,
				meetupId
			}),
			Speaker.create(speakerInfo)])
		})
		.then(([event, speaker]) => {
            let eventId = event[0].id
            let speakerId = speaker.id
            return Talk.create({
                ...talkInfo,
                speakerId, eventId
			})
		})
}

module.exports = { talkSubmit };
