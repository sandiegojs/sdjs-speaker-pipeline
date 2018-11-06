const app = require('../server');

function changeTalkStatus(talkId, status) {
	return new Promise((resolve, reject) => {
		const { Talk } = app.models;
		Talk.findById(talkId)
			.then((talk) => {
				if (status == 'Approve') {
					var newTalk = {
						"pending": false,
						"approved": true,
						"comments": talk.comments,
						"reminderSent": talk.reminderSent,
						"topic": talk.topic,
						"id": talk.id,
						"speakerId": talk.speakerId,
						"eventId": talk.eventId
					}
					Talk.replaceOrCreate(newTalk)
					return resolve(newTalk)
				}
				if (status == 'Deny') {
					var newTalk = {
						"pending": false,
						"approved": false,
						"comments": talk.comments,
						"reminderSent": talk.reminderSent,
						"topic": talk.topic,
						"id": talk.id,
						"speakerId": talk.speakerId,
						"eventId": talk.eventId
					}
					Talk.replaceOrCreate(newTalk)
					return resolve(newTalk)
				}
				else {
					reject(err => ({error: 'Undetermined status. Could not complete action', err}))
				}
			})
			.catch(err => ({ error: 'Could not find talk', err }))
	})
}

module.exports = { changeTalkStatus };