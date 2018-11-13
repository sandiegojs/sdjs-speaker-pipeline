const app = require('../server');

function changeTalkOwner(talkId, selectedOwner) {
	return new Promise((resolve, reject) => {
		const { Talk } = app.models;
				Talk.findById(talkId)
					.then((talk) => {
						const newTalk = {
								"status": talk.status,
								"description": talk.description,
								"reminderSent": talk.reminderSent,
								"topic": talk.topic,
								"id": talk.id,
								"speakerId": talk.speakerId,
                                "eventId": talk.eventId,
								"owner": selectedOwner,
								"adminNotes": talk.adminNotes
							}
						Talk.replaceOrCreate(newTalk)
						return resolve(newTalk)
					})
					.catch(err => ({ error: 'Could not find talk', err }))
	})
}



module.exports = { changeTalkOwner };