const app = require('../server');

function changeTalkStatus(talkId, selectedStatus) {
	return new Promise((resolve, reject) => {
		const { Talk } = app.models;
				Talk.findById(talkId)
					.then((talk) => {
						const newTalk = {
								"status": selectedStatus,
								"comments": talk.comments,
								"reminderSent": talk.reminderSent,
								"topic": talk.topic,
								"id": talk.id,
								"speakerId": talk.speakerId,
								"eventId": talk.eventId
							}
						Talk.replaceOrCreate(newTalk)
						return resolve(newTalk)
					})
					.catch(err => ({ error: 'Could not find talk', err }))
	})
}



module.exports = { changeTalkStatus };