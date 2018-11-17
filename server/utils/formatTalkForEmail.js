const app = require('../server');

function formatTalkForEmail(speakerId, eventId) {
    return new Promise((resolve, reject) => {
        if (speakerId == undefined) {
            reject({ message: 'Bad Speaker Id' });
            return false;
        }

        if (eventId == undefined) {
            reject({ message: 'Bad Event Id' });
            return false;
        }
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
                    .catch(err => reject({ error: 'could not find event', err }))
            })
            .catch(err => reject({ error: 'could not find talk', err }))
    })
}

module.exports = { formatTalkForEmail };