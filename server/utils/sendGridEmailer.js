const app = require('../server');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            
function sendEmailToSpeaker(adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate) {
    return new Promise((resolve, reject) => {
        console.log('this is speakerEmail', speakerEmail);
        console.log('this is adminEmail', adminEmail);

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
        
        const email = {
                to: `${speakerEmail}`,
                from: adminEmail,
                subject: 'SDJS Meetup Speaker Request',
                text: `${emailContent}`
        }
            sgMail.send(email);

            resolve(email);
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

module.exports = { sendEmailToSpeaker, sendEmailToAdmin } 
