const app = require('../server')

function getPendingTalkDetails() {
  return new Promise((resolve, reject) => {
    const { Talk, Speaker, Event } = app.models;
    Talk.find({ where: { or: [{status: "Pending" }, {status: "In Contact"}] }})
      .then(pendingTalks => {
        const talkInformation = pendingTalks.map((talk) => {
          return Speaker.findById(talk.speakerId)
            .then(speaker => {
              return Event.findById(talk.eventId)
                .then(selectedEvent => {
                  return {
                    speaker: speaker.firstName + ' ' + speaker.lastName,
                    speakerEmail: speaker.email,
                    topic: talk.topic,
                    description: talk.description,
                    talkId: talk.id,
                    currentStatus: talk.status,
                    eventName: selectedEvent.name,
                    eventDate: selectedEvent.date,
                    selectedStatus: undefined,
                    confirmationMessage: undefined 
                  }
                })
                .catch(err => ({ error: 'could not find event', err }))
            })
            .catch(err => ({ error: 'could not find speaker', err }))
        })
        Promise.all(talkInformation)
          .then((results) => resolve(results))
          .catch(err => ({ error: 'could not return results', err }))
      })
      .catch(err => ({ error: 'could not find pending talks', err }))
      .catch(err => reject(err))
  })
}

module.exports = { getPendingTalkDetails };