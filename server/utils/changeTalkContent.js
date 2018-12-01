'use strict';

const app = require('../server');

function changeTalkContent(talkId, newTopic, newDescription, newAdminNotes) {
  return new Promise((resolve, reject) => {
    if (talkId == undefined) {
      return reject(new Error('talkId is undefinded'));
    }

    if (newTopic == undefined) {
      return reject(new Error('newTopic is undefined'));
    }
    if (newDescription == undefined) {
      return reject(new Error('newDescription is undefined'));
    }

    if (newAdminNotes == undefined) {
      return reject(new Error('newAdminNotes is undefined'));
    }
    const {Talk} = app.models;
    Talk.findById(talkId)
      .then(talk => {
        const newTalk = {
          status: talk.status,
          description: newDescription,
          reminderSent: talk.reminderSent,
          topic: newTopic,
          id: talk.id,
          speakerId: talk.speakerId,
          eventId: talk.eventId,
          owner: talk.owner,
          organizerId: talk.organizerId,
          adminNotes: newAdminNotes,
        };
        Talk.replaceOrCreate(newTalk)
          .then(() => resolve(newTalk))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

module.exports = {changeTalkContent};
