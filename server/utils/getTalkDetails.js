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
                      speakerPhone: speaker.phone,
                      topic: talk.topic,
                      description: talk.description,
                      talkId: talk.id,
                      currentStatus: talk.status,
                      owner: talk.owner,
                      adminNotes: talk.adminNotes,
                      eventName: selectedEvent.name,
                      eventDate: selectedEvent.date,
                      meetupId: selectedEvent.meetupId,
                      selectedStatus: undefined,
                      toggleStatusEdit: false,
                      toggleOwnerEdit: false,
                      toggleShowMore: false,
                      toggleTalkEdit: false,
                      talkChanges: {
                        topic: talk.topic,
                        description: talk.description,
                        adminNotes: talk.adminNotes
                      }
                    }
                })
                .catch(err => reject(new Error('could not find event')))
            })
            .catch(err => reject(new Error('could not find speaker')))
        })
        Promise.all(talkInformation)
          .then(results => resolve(results))
          .catch(err => reject(new Error('could not return results')))
      })
      .catch(err => reject(new Error('could not find pending talks')))
  })
}

module.exports = { getTalkDetails };
