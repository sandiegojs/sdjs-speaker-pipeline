const app = require('../server');
const moment = require('moment');

function pastTalks(){
    return new Promise ((resolve, reject) => {
        const {Talk, Speaker, Event} = app.models;
        Talk.find({ where: {status: 'Approve'}})
            .then(talks => {
                console.log('talks: ', talks)
                const talkInformation = talks.map((talk) => {
                    return Speaker.find({where: {id: talk.speakerId}})
                        .then(speaker => {
                            console.log('speaker: ', speaker)
                            return Event.find({ where: {id: talk.eventId}})
                                .then(event => {
                                    console.log('Event: ', event)
                                    return {
                                        date: event[0].date,
                                        event: event[0].name,
                                        speaker: speaker[0].speakerName,
                                        topic: talk.topic
                                    }
                                })
                                .catch(err => reject({ error: '1 could not return results', err }))
                        })
                        .catch(err => reject({ error: '2 could not return results', err }))
                })
                Promise.all(talkInformation)
                    .then(results => {
                        console.log(results)
                        let date = moment('2019-03-14').format()
                        const filteredResults = results.filter(result => moment(result.date).format() < date)
                        console.log('filterd: ', filteredResults)
                        filteredResults.sort(function(a, b) {
                            a = moment(a.eventDate).format();
                            b = moment(b.eventDate).format();
                            return a>b ? -1 : a<b ? 1 : 0;
                        })
                        resolve(filteredResults)
                    })
                    .catch(err => reject({ error: '3 could not return results', err }))
            })
            .catch(err => reject({ error: '4 could not return results', err }))
    })
}

// function pastTalks(){
//     let counter = 0;
//     let mappedTalks = [];
//     let date = moment().format()
//     return new Promise((resolve, reject) => {
//         const { Talk, Speaker, Event } = app.models;
//         Talk.find({where: {status: 'Approve'}})
//             .then(talks => {
//                 const approvedTalks = talks
//                 approvedTalks.map(approvedTalk => {
//                     Event.findOne({where: {id: approvedTalk.eventId}})
//                         .then(event => {
//                             approvedTalk.__data.date = event.date
//                             approvedTalk.__data.event = event.name
//                             Speaker.findOne({ where: {id: approvedTalk.speakerId}})
//                                 .then(speaker => {
//                                     approvedTalk.__data.speaker = speaker.speakerName
//                                     let talkDate = moment(approvedTalk.__data.date).format()
//                                     if(date > talkDate){
//                                         mappedTalks.push(approvedTalk)
//                                     }
//                                     Event.find({ where: {date: {lt: date}}})
//                                         .then(response => {
//                                             counter ++
//                                             if(mappedTalks.length == counter){
//                                                 mappedTalks.sort(function(a, b) {
//                                                     a = moment(a.__data.date).format();
//                                                     b = moment(b.__data.date).format();
//                                                     return a>b ? -1 : a<b ? 1 : 0;
//                                                 })
//                                                 resolve(mappedTalks);
//                                             }
//                                         })
//                                         .catch(err => reject(err))
//                                 })
//                                 .catch(err => reject(err));
//                         })
//                         .catch(err => reject(err))
//                 })
//             })
//             .catch(err => reject(err))
//     })
// }

module.exports = { pastTalks };
