const app = require('../server');

function formatTalkForEmail(speakerId, eventId) {
    return new Promise((resolve, reject) => {
        const { Speaker, Event } = app.models;
        Speaker.findById(speakerId)
            .then(speaker => {
                const speakerName = speaker.firstName + ' ' + speaker.lastName;
                const speakerEmail = speaker.email
                Event.findById(eventId)
                    .then(selectedEvent => {
                        const meetupTitle = selectedEvent.name;
                        const meetupDate = selectedEvent.date;
                        resolve({
                            speakerName,
                            speakerEmail,
                            meetupTitle,
                            meetupDate
                        })
                    })
                    .catch(({error: 'could not find event', err}))
            })
            .catch(err => ({ error: 'could not find talk', err}))
    })
}

// { pending: false,
			// 	approved: true,
			// 	comments: 'will bring live elephant',
			// 	reminderSent: false,
			// 	topic: 'tiana\'s talk',
			// 	id: 5be1e034711684b9d8a8d8c2,
			// 	speakerId: 5be1dffb711684b9d8a8d8c1,
			// 	eventId: 5bdcdcf5f418ef6bb83a1b15 }

// sendEmailToSpeaker('tiana.hayden@me.com', true, false, speakerEmail, speakerName, meetupTitle, meetupDate)

module.exports = { formatTalkForEmail };