const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const ontime = require('ontime');
const { getTalkDetails } = require('./getTalkDetails');
const axios = require('axios');
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailToSpeaker(adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate) {
    return new Promise((resolve, reject) => {
        if (speakerEmail == undefined) {
            return reject(new Error('speakerEmail is undefined'));
         }
         if (meetupTitle == undefined) {
            return reject(new Error('meetupTitle is undefined'));
         }
         if (meetupDate == undefined) {
            return reject(new Error('meetupDate is undefined'));
         }

        let emailContent;
        if (approved && !pending) {
            emailContent = `Congratulations! Your request to speak at ${meetupTitle} on ${meetupDate} has been approved.`
        }

        if (!approved && !pending) {
            emailContent = `We're sorry your request to speak at ${meetupTitle} on ${meetupDate} has been denied.`
        }

        if (pending) {
            emailContent = `Thank you for signing up to speak ${meetupTitle} on ${meetupDate}. You will be notified as soon as a SDJS admin reviews your request.`
            sendEmailToAdmin(adminEmail, meetupDate, meetupTitle, speakerEmail, speakerName)
                .catch(err => console.log(err));
        }

        const email = {
            to: speakerEmail,
            from: adminEmail,
            subject: 'SDJS Meetup Speaker Request',
            templateId: process.env.ADMIN_SPEAKER_EMAIL_TEMPLATE,
            dynamic_template_data: {
                emailContent: emailContent,
                sdjsBtn: false,
                title: 'SDJS Meetup Speaker Request'
            }
        }
        sgMail.send(email)
            .then(() => resolve({ email }))
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

function sendEmailToAdmin(adminEmail, meetupDate, meetupTitle, speakerEmail, speakerName) {
    return new Promise((resolve, reject) => {

        if (speakerEmail == undefined) {
           return reject(new Erroor('Speaker Email is undefined'));
        }

        if (meetupTitle == undefined) {
            return reject(new Error('Meetup Title is undefined'));
        }

        if (meetupDate == undefined) {
            return reject(new Error('Bad Meetup Date'));
        }

        if (adminEmail == undefined) {
           return reject(new Error('Meetup Title is undefined'));
        }

        if (speakerName == undefined) {
            return reject(new Error('Meetup Date is undefined'));
        }

        let emailContent = `You have a pending speaker request from ${speakerName} for ${meetupTitle} on ${meetupDate}. would you like to approve or deny them.`
        const email = {
            to: adminEmail,
            from: adminEmail,
            subject: 'SDJS Meetup Speaker Request',
            templateId: process.env.ADMIN_SPEAKER_EMAIL_TEMPLATE,
            dynamic_template_data: {
                emailContent: emailContent,
                sdjsBtn: false,
                title: 'SDJS Meetup Speaker Request'
            }
        }
        sgMail.send(email)
            .then(() => resolve({ email }))
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}
function sendConfirmCancelToAdmin(confirm, meetupDate, meetupTitle, speakerName) {
    return new Promise((resolve, reject) => {
        if (confirm == undefined) {
           return reject(new Error('confirmed is undefined'));
        }

        if (meetupDate == undefined) {
           return reject(new Error('Meetup Date is undefined'));
        }
        if (meetupTitle == undefined) {
           return reject(new Error('Meetup Title is undefined'));
        }

        if (speakerName == undefined) {
           return reject(new Error('Meetup Date is undefined'));
        }

        let emailContent;
        let verb;
        if (confirm) {
            emailContent = `${speakerName} has confirmed thier talk on ${meetupDate} for ${meetupTitle}`
            verb = 'confirmed.'
        }
        if (!confirm) {
            emailContent = `${speakerName} has canceled thier talk on ${meetupDate} for ${meetupTitle}`
            verb = 'canceled.'
        }

        const email = {
            to: process.env.ADMIN_EMAIL,
            from: process.env.ADMIN_EMAIL,
            subject: 'SDJS Meetup Speaker Request',
            templateId: process.env.ADMIN_SPEAKER_EMAIL_TEMPLATE,
            dynamic_template_data: {
                emailContent: emailContent,
                sdjsBtn: false,
                title: `SDJS Meetup Speaker ${verb}`
            }
        }

        sgMail.send(email)
            .then(() => {
                return resolve({ email })
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

function sendEmailToNewAdmin(username, email) {
    return new Promise((resolve, reject) => {
        if (username == undefined) {
           return reject(new Error('New Admin username is undefined'));
        }

        if (email == undefined) {
           return reject(new Error('New Admin Email is undefined'));
        }

        let emailContent = `You have been made an admin on the SDJS Meetup website.
                To login please go to ${process.env.SITE_URL}/AdminLogin and enter your
                email and your temporary password. To edit your user name, email,
                password go to the Organizers tab and click on the edit button.`;
        const newAdminEmail = {
            to: email,
            from: process.env.ADMIN_EMAIL,
            subject: 'SDJS Meetup Admin Appointment',
            templateId: process.env.ADMIN_SPEAKER_EMAIL_TEMPLATE,
            dynamic_template_data: {
                emailContent: emailContent,
                sdjsBtn: false,
                title: 'SDJS Meetup Admin Appointment'
            }
        }
        sgMail.send(newAdminEmail)
            .then(() => resolve({ newAdminEmail }))
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

// ontime({
//     cycle: '8:00:00'
// }, function (ot) {

//     getTalkDetails()
//         .then(res => {
//             let date = new Date();
//             let threeDaysFromNow = moment(date).add(3, 'day').format('YYYY-MM-DD');
//             res = res.filter(talk => talk.currentStatus === 'Approve' && moment(talk.eventDate).add(1, 'day').format('YYYY-MM-DD') === threeDaysFromNow)
//             if (
//                 res.length !== 0) {
//                 axios.post('http://localhost:3000/api/organizers/login', { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD, ttl: 60 * 5 })
//                     .then(response => {
//                         return response.data.id
//                     }).then(accessToken => {
//                         res.forEach(speaker => {
//                             return new Promise((resolve, reject) => {
//                                 if (accessToken == undefined) {
//                                     reject({ message: 'Bad accessToken in reminder email' });
//                                     return false;
//                                 }

//                                 if ( speaker.speakerEmail == undefined) {
//                                     reject({ message: 'Bad Speaker Email in reminder email' });
//                                     return false;
//                                 }

//                                 if ( speaker.eventName == undefined) {
//                                     reject({ message: 'Bad event name in reminder email' });
//                                     return false;
//                                 }

//                                 if ( speaker.eventDate == undefined) {
//                                     reject({ message: 'Bad Meetup Date in reminder email' });
//                                     return false;
//                                 }

//                                 if (speaker.talkId == undefined) {
//                                     reject({ message: 'Bad talkId in reminder email' });
//                                     return false;
//                                 }

//                                 axios({
//                                     method: 'post',
//                                     url: `http://localhost:3000/api/accessTokens`,
//                                     headers: {
//                                         Authorization: accessToken
//                                     },
//                                     data: {
//                                         id: speaker.TalkId,
//                                         ttl: 60 * 60 * 24 * 3
//                                     }
//                                 }).then(response => {
//                                     return response.data.id
//                                 }).then(speakerToken => {
//                                     let emailContent = `SDJS would like to remind you that you have
//                                                         been approved to speeak at ${speaker.eventName} on ${speaker.eventDate.toDateString()}.
//                                                         Please click this button to visit out site to confirm or cancel your talk. `

//                                     const url = 'http://localhost:3000/#/ConfirmOrCancel/?t=';
//                                     const reminder = {
//                                         to: speaker.speakerEmail,
//                                         from: process.env.ADMIN_EMAIL,
//                                         subject: 'SDJS Meetup Speaker Reminder',
//                                         templateId: process.env.SPEAKER_REMINDER_EMAIL_TEMPLATE,
//                                         dynamic_template_data: {
//                                             emailContent: emailContent,
//                                             sdjsBtn: true,
//                                             url: (url + speakerToken + '&eventId=' + speaker.talkId),
//                                             title: 'SDJS Meetup Speaker Reminder'
//                                         }
//                                     }
//                                     sgMail.send(reminder)
//                                         .then(() => {
//                                             resolve({ reminder })
//                                         })
//                                         .catch(err => {
//                                             console.log(err);
//                                             reject(err);
//                                         })
//                                 })
//                             })
//                         })
//                     })
//             }
//         })

//     ot.done()
//     return
// })

module.exports = { sendEmailToSpeaker, sendEmailToAdmin, sendEmailToNewAdmin, sendConfirmCancelToAdmin }
