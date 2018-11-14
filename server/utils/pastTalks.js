const app = require('../server');
const moment = require('moment');

function pastTalks(){
    let counter = 0;
    let mappedTalks = [];
    let date = new Date()
    return new Promise((resolve, reject) => {
        const { Talk, Speaker, Event } = app.models;
        Talk.find({where: {status: 'Approve'}})
            .then(talks => {
                const approvedTalks = talks
                approvedTalks.map(approvedTalk => {
                    Event.find({where: {id: approvedTalk.eventId}})
                        .then(event => {
                            approvedTalk.__data.date = event[0].date
                            approvedTalk.__data.event = event[0].name
                            Speaker.find({ where: {id: approvedTalk.speakerId}})
                                .then(speaker => {
                                    approvedTalk.__data.speaker = speaker[0].speakerName
                                    let now = date;
                                    let talkDate = moment(new Date(approvedTalk.__data.date)).format()
                                    if(now > talkDate){
                                        mappedTalks.push(approvedTalk)
                                    }
                                    else{console.log('date is not in the past')}
                                    Event.find({ where: {date: {lt: date}}})
                                        .then(response => {
                                            counter ++
                                            if(mappedTalks.length == counter){
                                                mappedTalks.sort(function(a, b) {
                                                    a = new Date(a.__data.date);
                                                    b = new Date(b.__data.date);
                                                    return a>b ? -1 : a<b ? 1 : 0;
                                                })
                                                resolve(mappedTalks);
                                            }
                                        })
                                        .catch(err => console.log(err))
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err))
                })
            })
            .catch =(err => console.log(err))
    })
}

module.exports = { pastTalks };
