const app = require('../server');
const { getMeetups } = require('./getMeetups')

function talkSubmit(speakerInfo, talkInfo, date) {
	return new Promise((resolve, reject) => {
		const { Talk, Speaker, Event } = app.models;
		Speaker.create(speakerInfo)
			.then(response => {
				console.log('response: ', response)
				let speakerId = response.id
				getMeetups()
					.then(response2 => {
						console.log('response2: ', response2)
						console.log('date: ', date)
						const index = response2.findIndex((item) => {
							return item.date == date
						})
						let name = response2[index].name;
						let details = response2[index].description;
						Event.findOrCreate({date, name, details})
							.then(response3 => {
								let eventId = response3[0].id
								let ids = { speakerId, eventId };
								Talk.create( { ...talkInfo, speakerId, eventId})
									.then(response4 => {
										return resolve(response4)
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
