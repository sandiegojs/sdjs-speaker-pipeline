'use strict';

const app = require('../server');

function changeTalkStatus(talkId, selectedStatus) {
  return new Promise((resolve, reject) => {
    if (talkId == undefined) {
      return reject(new Error('TalkId is undefined'));
    }

    if (selectedStatus == undefined) {
      return reject(new Error('selectedStatus is undefined'));
    }
    const {Talk} = app.models;
    Talk.findById(talkId)
      .then(talk => {
        const newTalk = {
          status: selectedStatus,
          description: talk.description,
          reminderSent: talk.reminderSent,
          topic: talk.topic,
          id: talk.id,
          speakerId: talk.speakerId,
          eventId: talk.eventId,
          owner: talk.owner,
          adminNotes: talk.adminNotes,
          organizerId: talk.organizerId,
        };
        Talk.replaceOrCreate(newTalk)
          .then(() => resolve(newTalk))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

module.exports = {changeTalkStatus};
