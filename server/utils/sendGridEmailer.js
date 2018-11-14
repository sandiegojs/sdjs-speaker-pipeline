const app = require('../server');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            
function sendEmailToSpeaker(adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate) {

    return new Promise((resolve, reject) => {
        if (speakerEmail == undefined) {
            resolve('Bad Speaker Email1');
            return false;
        } 
        
        if(meetupTitle == undefined) {
            resolve('Bad Meetup Title1');
            return false;
        }

        if(meetupDate == undefined) {
            resolve('Bad Meetup Date1');
            return false;
        }

        if (approved && !pending) {
            var emailContent = `Congratulations! Your request to speak at ${meetupTitle} on ${meetupDate} has been approved.`
        }

        if (!approved && !pending) {

            var emailContent = `We're sorry your request to speak at ${meetupTitle} on ${meetupDate} has been denied.`
        }

        if (pending) {

            var emailContent = `Thank you for signing up to speak ${meetupTitle} on ${meetupDate}. You will be notified as soon as a SDJS admin reviews your request.`
            sendEmailToAdmin(adminEmail, meetupDate, meetupTitle, speakerEmail, speakerName);
        }
        let reminderDate = moment(meetupDate, '').add(17, 'hours').add(7, 'minutes').unix();
        
        const email = {
            to: speakerEmail,
            from: adminEmail,
            subject: 'SDJS Meetup Speaker Request',
            templateId: 'd-b593d56913f7494cb1faf97354fb475c',
            send_at: reminderDate,
            dynamic_template_data: {
                emailContent: `${emailContent}`,
            }
        }
        const emailReminder = {
            "to": [
                speakerEmail
            ],
            "from": adminEmail,
            "subject": 'SDJS Meetup Speaker Request',
            "send_at": reminderDate,
            "templateId": 'd-b593d56913f7494cb1faf97354fb475c',
            "dynamic_template_data": {
                "meetupTitle": `${meetupTitle}`,
                "meetupDate": `${meetupDate}`,
            }
        }

            sgMail.send(emailReminder);

            resolve({ email, emailReminder });
    })
}

function sendEmailToAdmin(adminEmail, meetupDate, meetupTitle, speakerEmail, speakerName ) {

    return new Promise((resolve, reject) =>{

        if (speakerEmail == undefined) {

            resolve('Bad Speaker Email');
            return false;
        } 
        
        if(meetupTitle == undefined) {

            resolve('Bad Meetup Title');
            return false;
        }

        if(meetupDate == undefined) {

            resolve('Bad Meetup Date');
            return false;
        }

        if(adminEmail == undefined) {

            resolve('Bad Meetup Title');
            return false;
        }

        if(speakerName == undefined) {

            resolve('Bad Meetup Date');
            return false;
        }

        const email = {
                to:         adminEmail,
                from:       adminEmail,
                subject:    'SDJS Meetup Speaker Request',
                text:       `You have a pending speaker request from ${speakerName} for ${meetupTitle} on ${meetupDate}. would you like to approve or deny them.`
        }

            sgMail.send(email);

            resolve(email); 

    })
}

function sendEmailToNewAdmin(newAdminEmail, adminEmail, newAdminPhone, adminTempPw ) {

    return new Promise((resolve, reject) =>{

        if (newAdminEmail == undefined) {

            resolve('Bad New Admin Email');
            return false;
        } 

        if(adminEmail == undefined) {

            resolve('Bad Admin Email');
            return false;
        }
        if (adminTempPw == undefined) {

            resolve('Bad Admin Temp Pw');
            return false;
        } 

        if(newAdminPhone == undefined) {

            resolve('Bad New Admin Phone');
            return false;
        }

        const email = {
                to:         newAdminEmail,
                from:       adminEmail,
                subject:    'SDJS Meetup Admin Appointment',
                text:       `You have been made an admin on the SDJS Meetup website. 
                    To login please go to http/localhost/3000/AdminLogin and enter your 
                    email and your temporary password. To edit your user name, email, 
                    password go to the Organizers tab and click on the edit button.`
        }

            sgMail.send(email);

            resolve(email); 

    })
}
module.exports = { sendEmailToSpeaker, sendEmailToAdmin, sendEmailToNewAdmin } 
