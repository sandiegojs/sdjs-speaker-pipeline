const app = require('../server')

function getTalkDetails() {
  return new Promise((resolve, reject) => {
    const { Talk, Speaker, Event } = app.models;
    Talk.find({})
      .then(talks => {
        const talkInformation = talks.map((talk) => {
          return Speaker.findById(talk.speakerId)
            .then(speaker => {
              return Event.findById(talk.eventId)
                .then(selectedEvent => {
                  return {
                    speaker: speaker.speakerName,
                    speakerEmail: speaker.speakerEmail,
                    topic: talk.topic,
                    description: talk.description,
                    talkId: talk.id,
                    currentStatus: talk.status,
                    eventName: selectedEvent.name,
                    eventDate: selectedEvent.date,
                    meetupId: selectedEvent.meetupId,
                    selectedStatus: undefined,
                    confirmationMessage: undefined 
                  }
                })
                .catch(err => ({ error: 'could not find event', err }))
            })
            .catch(err => ({ error: 'could not find speaker', err }))
        })
        Promise.all(talkInformation)
          .then(results => resolve(results))
          .catch(err => ({ error: 'could not return results', err }))
      })
      .catch(err => ({ error: 'could not find pending talks', err }))
      .catch(err => reject(err))
  })
}

module.exports = { getTalkDetails };