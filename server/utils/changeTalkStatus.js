const app = require('../server');

function changeTalkStatus(talkId, selectedStatus) {
	return new Promise((resolve, reject) => {
		const { Talk } = app.models;
		Talk.findById(talkId)
			.then((talk) => {
				const newTalk = {
					"status": selectedStatus,
					"description": talk.description,
					"reminderSent": talk.reminderSent,
					"topic": talk.topic,
					"id": talk.id,
					"speakerId": talk.speakerId,
					"eventId": talk.eventId,
					"owner": talk.owner,
					"adminNotes": talk.adminNotes
				}
				Talk.replaceOrCreate(newTalk)
					.then(() => resolve(newTalk))
					.catch(err => reject(err));
				return resolve(newTalk)
			})
			.catch(err => reject({ error: 'Could not find talk', err }))
	})
}



module.exports = { changeTalkStatus };