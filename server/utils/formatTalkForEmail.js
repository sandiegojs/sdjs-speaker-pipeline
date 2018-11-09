const app = require('../server');

function formatTalkForEmail(speakerId, eventId) {
    return new Promise((resolve, reject) => {
        const { Speaker, Event } = app.models;
        Speaker.findById(speakerId)
            .then(speaker => {
                const speakerName = speaker.speakerName;
                const speakerEmail = speaker.speakerEmail
                Event.findById(eventId)
                    .then(selectedEvent => {
                        const meetupTitle = selectedEvent.name;
                        const meetupDate = selectedEvent.date;
                        resolve({
                            speakerName,
                            speakerEmail,
                            meetupTitle,
                            meetupDate
                        })
                    })
                    .catch(({error: 'could not find event', err}))
            })
            .catch(err => ({ error: 'could not find talk', err}))
    })
}

module.exports = { formatTalkForEmail };