const app = require('../server');
const { getMeetups } = require('./getMeetups')

function talkSubmit(speakerInfo, talkInfo, date) {
	return new Promise((resolve, reject) => {
		const { Talk, Speaker, Event } = app.models;
		console.log('date: ', date)
		Speaker.create(speakerInfo)
			.then(response => {
				console.log('response: ', response)
				let speakerId = response.id
				getMeetups()
					.then(response2 => {
						const index = response2.findIndex((item) => {
							return item.date == date
						})
						console.log('event name: ', response2[index].name);
						console.log('event description: ', response2[index].description)
						let name = response2[index].name;
						let details = response2[index].description;
						//let date = response.date
						Event.findOrCreate({date, name, details})
							.then(response3 => {
								console.log('response3: ', response3)
								let eventId = response3[0].id
								console.log('eventId: ', response3[0].id)
								let ids = { speakerId, eventId };
								Talk.create( { ...talkInfo, speakerId, eventId})
									.then(response4 => {
										console.log(ids);
										console.log('response4: ', response4)
										resolve(response4)
									})
									.catch(err => console.log(err))
								resolve(response3)
							})
							.catch(err => console.log(err))
						resolve(response2)
					})
					.catch(err => console.log(err))
				resolve(response)
			})
			.catch(err => console.log(err))

	})
}

module.exports = { talkSubmit };
