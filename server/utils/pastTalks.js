const app = require('../server');
const moment = require('moment');

function pastTalks(){
    let counter = 0;
    let mappedTalks = [];
    //let date = new Date()
    let date = moment(new Date()).add(2, 'month').format()
    //let date = moment(new Date('2018-12-22')).format()
    //console.log('date: ', date)
    return new Promise((resolve, reject) => {
        const { Talk, Speaker, Event } = app.models;
        Talk.find({where: {status: 'Approve'}})
            .then(talks => {
                console.log('talks: ', talks.length)
                const approvedTalks = talks
                //console.log('approvedTalks: ', approvedTalks)
                approvedTalks.map(approvedTalk => {
                    Event.find({where: {id: approvedTalk.eventId}})
                        .then(event => {
                            //approvedTalk = { ...approvedTalk.__data, date: event[0].date }
                            approvedTalk.__data.date = event[0].date
                            approvedTalk.__data.event = event[0].name
                            //console.log('approvedTalk: ', approvedTalk)
                            Speaker.find({ where: {id: approvedTalk.speakerId}})
                                .then(speaker => {
                                    //console.log('speaker: ', speaker)
                                    approvedTalk.__data.speaker = speaker[0].speakerName
                                    //console.log('approvedTalk.date: ', approvedTalk.__data.date)
                                    let now = date;
                                    let talkDate = moment(new Date(approvedTalk.__data.date)).format()
                                    //console.log('now: ', now)
                                    //console.log('talkDate: ', talkDate)
                                    if(now > talkDate){
                                        mappedTalks.push(approvedTalk)
                                    }
                                    else{console.log('date is not in the past')}
                                    //mappedTalks.push(approvedTalk);
                                    //console.log('mappedTalks: ', mappedTalks)
                                    Event.find({ where: {date: {lt: date}}})
                                        .then(response => {
                                            counter ++
                                            console.log('counter: ', counter)
                                            if(mappedTalks.length == counter){
                                                //console.log('mappedTalks: ', mappedTalks)
                                                mappedTalks.sort(function(a, b) {
                                                    a = new Date(a.__data.date);
                                                    b = new Date(b.__data.date);
                                                    //console.log('a:, ', a, 'b: ', b)
                                                    return a>b ? -1 : a<b ? 1 : 0;
                                                })
                                                //console.log('mappedTalksSorted: ', mappedTalks)
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


// Event.find({ where: {date: {lt: date}}})
//     .then(events => {
//         console.log('event: ', events)
//         events.map(event => {
//             Talk.find({ where: {and: [{eventId: event.id}, {status: 'Approve'}]}})
//                 .then(talks => {
//                     talks.speakers = []
//                     console.log('talk: ', talks)
//                 })
//         })
       
//     })
//     .catch(err => console.log('cant find talks', err))