const axios = require('axios');

function getMeetups() {
	return new Promise((resolve, reject) => {
		let currentDate = new Date();
		currentDate.setMonth(currentDate.getMonth() + 3);
		axios.get(`https://api.meetup.com/sandiegojs/events?no_later_than=${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDay()}`)
			.then(response => {
				resolve(response.data.map(event => ({
					meetupId: event.id,
					name: event.name,
					date: event.local_date,
					time: event.local_time,
					venue: event.venue,
					link: event.link,
					description: event.description,
				})));
			})
			.catch(err => reject(new Error('getMeetups failed to get SDJS meetups')))
	})
}

module.exports = { getMeetups };
