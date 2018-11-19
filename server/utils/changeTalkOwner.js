const app = require('../server');

function changeTalkOwner(talkId, selectedOwner) {
	return new Promise((resolve, reject) => {
		if (talkId == undefined) {
            reject({ message: 'Bad Talk Id' });
            return false;
        }

        if (selectedOwner == undefined) {
            reject({ message: 'No Owner Selected' });
            return false;
        }
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
					.then(() => resolve(newTalk))
					.catch(err => reject(err));
			})
			.catch(err => reject({ error: 'Could not find talk', err }))
	})
}



module.exports = { changeTalkOwner };