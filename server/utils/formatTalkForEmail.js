'use strict';

const app = require('../server');

function formatTalkForEmail(speakerId, eventId) {
  return new Promise((resolve, reject) => {
    if (speakerId == undefined) {
      return reject(new Error('speakerId is undefined'));
    }

    if (eventId == undefined) {
      return reject(new Error('eventId is undefined'));
    }
    const {Speaker, Event} = app.models;
    Speaker.findById(speakerId)
      .then(speaker => {
        const speakerName = speaker.speakerName;
        const speakerEmail = speaker.speakerEmail;
        Event.findById(eventId)
          .then(selectedEvent => {
            const meetupTitle = selectedEvent.name;
            const meetupDate = selectedEvent.date;
            resolve({
              speakerName,
              speakerEmail,
              meetupTitle,
              meetupDate,
            });
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

module.exports = {formatTalkForEmail};
