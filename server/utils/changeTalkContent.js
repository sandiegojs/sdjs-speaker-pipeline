const app = require('../server');

function changeTalkContent(talkId, newTopic, newDescription, newAdminNotes) {
	return new Promise((resolve, reject) => {
		if (talkId == undefined) {
            reject({ message: 'Bad talk Id' });
            return false;
        }

        if (newTopic == undefined) {
            reject({ message: 'Bad newTopic' });
            return false;
		}
		if (newDescription == undefined) {
            reject({ message: 'Bad newDescription' });
            return false;
        }

        if (newAdminNotes == undefined) {
            reject({ message: 'newAdminNotes' });
            return false;
        }
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
					"organizerId": talk.organizerId,
					"adminNotes": newAdminNotes
				}
				Talk.replaceOrCreate(newTalk)
					.then(() => resolve(newTalk))
					.catch(err => reject(err));
			})
			.catch(err => reject({ error: 'Could not find talk', err }))
	})
}

module.exports = { changeTalkContent };
