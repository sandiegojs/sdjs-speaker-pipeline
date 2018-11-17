const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const ontime = require('ontime');
const { getTalkDetails } = require('./getTalkDetails');
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailToSpeaker(adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate) {
    console.log('this is meetup date in emailer: '.meetupDate)
    return new Promise((resolve, reject) => {
        if (speakerEmail == undefined) {
            reject({ message: 'Bad Speaker Email' });
            return false;
        }

        if (meetupTitle == undefined) {
            reject({ message: 'Bad Meetup Title' });
            return false;
        }

        if (meetupDate == undefined) {
            reject({ message: 'Bad Meetup Date' });
            return false;
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
            templateId: 'd-b593d56913f7494cb1faf97354fb475c',
            dynamic_template_data: {
                emailContent: emailContent,
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
            reject({ message: 'Bad Speaker Email' });
            return false;
        }

        if (meetupTitle == undefined) {

            reject({ message: 'Bad Meetup Title' });
            return false;
        }

        if (meetupDate == undefined) {

            reject({ message: 'Bad Meetup Date' });
            return false;
        }

        if (adminEmail == undefined) {

            reject({ message: 'Bad Meetup Title' });
            return false;
        }

        if (speakerName == undefined) {

            reject({ message: 'Bad Meetup Date' });
            return false;
        }

        const email = {
            to: adminEmail,
            from: adminEmail,
            subject: 'SDJS Meetup Speaker Request',
            text: `You have a pending speaker request from ${speakerName} for ${meetupTitle} on ${meetupDate}. would you like to approve or deny them.`
        }
        sgMail.send(email)
            .then(() => resolve({ email }))
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

function sendEmailToNewAdmin(username, email) {
    return new Promise((resolve, reject) => {

        if (username == undefined) {

            reject({ message: 'Bad New Admin username' });
            return false;
        }

        if (email == undefined) {

            reject({ message: 'Bad New Admin Email' });
            return false;
        }

        const newAdminEmail = {
            to: email,
            from: process.env.MAIN_ADMIN_EMAIL,
            subject: 'SDJS Meetup Admin Appointment',
            text: `You have been made an admin on the SDJS Meetup website. 
                    To login please go to http/localhost/3000/AdminLogin and enter your 
                    email and your temporary password. To edit your user name, email, 
                    password go to the Organizers tab and click on the edit button.`
        }
        sgMail.send(newAdminEmail)
            .then(() => resolve({ newAdminEmail }))
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

ontime({
    cycle: '8:00:00'
}, function (ot) {

    getTalkDetails()
        .then(res => {
            let date = new Date();
            let threeDaysFromNow = moment(date).add(2, 'day').format('YYYY-MM-DD');
            res = res.filter(talk => talk.currentStatus === 'Approve' && moment(talk.eventDate).format('YYYY-MM-DD') === threeDaysFromNow)

            if (
                res.length !== 0) {
                res.forEach(speaker => {
                    return new Promise((resolve, reject) => {
                        if (
                            speaker.speakerEmail == undefined) {
                            reject({ message: 'Bad Speaker Email in reminder email' });
                            return false;
                        }

                        if (
                            speaker.eventName == undefined) {
                            reject({ message: 'Bad event name in reminder email' });
                            return false;
                        }

                        if (
                            speaker.eventDate == undefined) {
                            reject({ message: 'Bad Meetup Date in reminder email' });
                            return false;
                        }

                        var emailContent = `SDJS would like to remind you that you have 
                        been approved to speeak at ${speaker.eventName} on ${speaker.eventDate.toDateString()}. 
                        Please click this button to visit out site to confirm or cancel your talk. `

                        const reminder = {
                            to: speaker.speakerEmail,
                            from: process.env.MAIN_ADMIN_EMAIL,
                            subject: 'SDJS Meetup Speaker Reminder',
                            templateId: 'd-b593d56913f7494cb1faf97354fb475c',
                            dynamic_template_data: {
                                emailContent: emailContent,
                            }
                        }

                        sgMail.send(reminder)
                            .then(() => resolve({ reminder })
                                .catch(err => {
                                    console.log(err);
                                    reject(err);
                                }));
                    })
                })
            }
        })

    ot.done()
    return
})

module.exports = { sendEmailToSpeaker, sendEmailToAdmin, sendEmailToNewAdmin } 
