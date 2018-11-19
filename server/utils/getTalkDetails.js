const app = require('../server')
const moment = require('moment');

function getTalkDetails() {
  return new Promise((resolve, reject) => {
    const { Talk, Speaker, Event } = app.models;
    Talk.find({})
      .then(talks => {
        const talkInformation = talks.map((talk) => {
          return Speaker.findById(talk.speakerId)
            .then(speaker => {
              //console.log('speaker: ', speaker)
              return Event.findById(talk.eventId)
                .then(selectedEvent => {
                  //if date after today....
                  //console.log('events: ', selectedEvent)
                  
                  //if(moment(selectedEvent.date).format() > date){
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
                  //}
                })
                .catch(err => reject({ error: 'could not find event', err }))
            })
            .catch(err => reject({ error: 'could not find speaker', err }))
        })
        Promise.all(talkInformation)
        //sort by date try this one first 
          .then(results => {
            let date = moment().format();
            //console.log('results: ', results)
            const filteredResults = results.filter(item => moment(item.eventDate).format() > date)
            //console.log('filteredResults: ', filteredResults)
            filteredResults.sort(function(a, b) {
              a = moment(a.eventDate).format();
              b = moment(b.eventDate).format();
              return a<b ? -1 : a>b ? 1 : 0;
          })
            resolve(filteredResults)
          })
          .catch(err => reject({ error: 'could not return results', err }))
      })
      .catch(err => reject({ error: 'could not find pending talks', err }))
  })
}

module.exports = { getTalkDetails };