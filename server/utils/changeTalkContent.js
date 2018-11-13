const app = require('../server');

function changeTalkContent(talkId, newTopic, newDescription, newAdminNotes) {
	return new Promise((resolve, reject) => {
		const { Talk } = app.models;
				Talk.findById(talkId)
					.then((talk) => {
						const newTalk = {
								"status": talk.status,
								"description": newDescription,
								"reminderSent": talk.reminderSent,
								"topic": newTopic,
								"id": talk.id,
								"speakerId": talk.speakerId,
                                "eventId": talk.eventId,
								"owner": talk.owner,
								"adminNotes": newAdminNotes
							}
						Talk.replaceOrCreate(newTalk)
						return resolve(newTalk)
					})
					.catch(err => ({ error: 'Could not find talk', err }))
	})
}



module.exports = { changeTalkContent };