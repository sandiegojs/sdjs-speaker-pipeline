'use strict';

const app = require('../server');

function changeTalkOwner(talkId, selectedOwner) {
  return new Promise((resolve, reject) => {
    if (talkId == undefined) {
      return reject(new Error('TalkId is undefined'));
    }

    if (selectedOwner == undefined) {
      return reject(new Error('SelectedOwner is undefined'));
    }

    const {Talk, Organizer} = app.models;
    Talk.findById(talkId)
      .then(talk => {
        let newTalk = {
          status: talk.status,
          description: talk.description,
          reminderSent: talk.reminderSent,
          topic: talk.topic,
          id: talk.id,
          speakerId: talk.speakerId,
          eventId: talk.eventId,
          adminNotes: talk.adminNotes,
        };
        if (selectedOwner === 'None') {
          newTalk = {
            ...newTalk,
            owner: selectedOwner
          };
          Talk.replaceOrCreate(newTalk)
            .then(() => resolve(newTalk))
            .catch(err => reject(err));
        } else {
          Organizer.find({ where: { username: selectedOwner } })
            .then(organizer => {
              newTalk = {
                ...newTalk,
                owner: selectedOwner,
                organizerId: organizer[0].id
              };
              Talk.replaceOrCreate(newTalk)
                .then(() => resolve(newTalk))
                .catch(err => reject(err));
            })
            .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
  });
}

module.exports = {changeTalkOwner};
