const app = require('../server');
const moment = require('moment');

function pastTalks(){
    let counter = 0;
    let mappedTalks = [];
    let date = moment().format()
    return new Promise((resolve, reject) => {
        const { Talk, Speaker, Event } = app.models;
        Talk.find({where: {status: 'Approve'}})
            .then(talks => {
                const approvedTalks = talks
                approvedTalks.map(approvedTalk => {
                    Event.findOne({where: {id: approvedTalk.eventId}})
                        .then(event => {
                            approvedTalk.__data.date = event.date
                            approvedTalk.__data.event = event.name
                            Speaker.findOne({ where: {id: approvedTalk.speakerId}})
                                .then(speaker => {
                                    approvedTalk.__data.speaker = speaker.speakerName
                                    let talkDate = moment(approvedTalk.__data.date).format()
                                    if(date > talkDate){
                                        mappedTalks.push(approvedTalk)
                                    }
                                    Event.find({ where: {date: {lt: date}}})
                                        .then(response => {
                                            counter ++
                                            if(mappedTalks.length == counter){
                                                mappedTalks.sort(function(a, b) {
                                                    a = moment(a.__data.date).format();
                                                    b = moment(b.__data.date).format();
                                                    return a>b ? -1 : a<b ? 1 : 0;
                                                })
                                                resolve(mappedTalks);
                                            }
                                        })
                                        .catch(err => reject(err))
                                })
                                .catch(err => reject(err));
                        })
                        .catch(err => reject(err))
                })
            })
            .catch(err => reject(err))
    })
}

module.exports = { pastTalks };
