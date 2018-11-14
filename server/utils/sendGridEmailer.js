const app = require('../server');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            
function sendEmailToSpeaker(adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate) {
    console.log('this is meetupDate', meetupDate)
    console.log('this is this is speakerEmail', speakerEmail)

    return new Promise((resolve, reject) => {
console.log(1)
        if (speakerEmail == undefined) {
            console.log(2)
            resolve('Bad Speaker Email1');
            return false;
        } 
        
        if(meetupTitle == undefined) {
            console.log(3)
            resolve('Bad Meetup Title1');
            return false;
        }

        if(meetupDate == undefined) {
        console.log(4)
            resolve('Bad Meetup Date1');
            return false;
        }

        if (approved && !pending) {
            console.log(5)
            var emailContent = `Congratulations! Your request to speak at ${meetupTitle} on ${meetupDate} has been approved.`
        }

        if (!approved && !pending) {
            console.log(6)

            var emailContent = `We're sorry your request to speak at ${meetupTitle} on ${meetupDate} has been denied.`
        }

        if (pending) {
            console.log(7)

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
        //let reminderDate = moment(meetupDate).subtract(3, 'days').add(8, 'hours');
        console.log('this is reminderDate in unix',reminderDate)
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
        console.log(8, emailReminder)

            //sgMail.send(email);
            sgMail.send(emailReminder);
            console.log(9)


            resolve({ email, emailReminder });
            console.log(10)

    })
}

function sendEmailToAdmin(adminEmail, meetupDate, meetupTitle, speakerEmail, speakerName ) {
    console.log(11)

    return new Promise((resolve, reject) =>{
        console.log(12)

        if (speakerEmail == undefined) {
            console.log(13)

            resolve('Bad Speaker Email');
            return false;
        } 
        
        if(meetupTitle == undefined) {
            console.log(14)

            resolve('Bad Meetup Title');
            return false;
        }

        if(meetupDate == undefined) {
            console.log(15)

            resolve('Bad Meetup Date');
            return false;
        }

        if(adminEmail == undefined) {
            console.log(16)

            resolve('Bad Meetup Title');
            return false;
        }

        if(speakerName == undefined) {
            console.log(17)

            resolve('Bad Meetup Date');
            return false;
        }

        const email = {
                to:         adminEmail,
                from:       adminEmail,
                subject:    'SDJS Meetup Speaker Request',
                text:       `You have a pending speaker request from ${speakerName} for ${meetupTitle} on ${meetupDate}. would you like to approve or deny them.`
        }
        console.log(18)

            sgMail.send(email);
            console.log(19)

            resolve(email); 
            console.log(20)

    })
}

function sendEmailToNewAdmin(newAdminEmail, adminEmail, newAdminPhone, adminTempPw ) {
    console.log(111)

    return new Promise((resolve, reject) =>{
        console.log(112)

        if (newAdminEmail == undefined) {
            console.log(113)

            resolve('Bad New Admin Email');
            return false;
        } 

        if(adminEmail == undefined) {
            console.log(114)

            resolve('Bad Admin Email');
            return false;
        }
        if (adminTempPw == undefined) {
            console.log(115)

            resolve('Bad Admin Temp Pw');
            return false;
        } 

        if(newAdminPhone == undefined) {
            console.log(116)

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
        console.log(117)

            sgMail.send(email);
            console.log(118)

            resolve(email); 
            console.log(119)

    })
}
module.exports = { sendEmailToSpeaker, sendEmailToAdmin, sendEmailToNewAdmin } 
//            "templateId": 'd-f43daeeaef504760851f727007e0b5d0',
