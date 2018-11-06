'use strict';

const { getMeetups } = require('../../server/utils/getMeetups');

module.exports = function (Talk) {
	Talk.getMeetups = function (cb) {
		getMeetups()
			.then(meetups => cb(null, meetups))
			.catch(err => cb(err))
	}

	Talk.remoteMethod('getMeetups', {
		description: 'Gets all SDJS meetups for the next 3 months.',
		http: {
			path: '/getMeetups',
			verb: 'get'
		},
		returns: {
			arg: 'data',
			type: 'array',
			root: true
		}
    })
};
    
const { sendEmailToSpeaker } = require('../../server/utils/sendGridEmailer');
module.exports = function(Talk) {
    Talk.sendEmailToSpeaker = function(adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate, cb) {
        sendEmailToSpeaker(adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate, cb)
            .then (email => cb(null, email))
            .catch(err => cb(err))
    }

    Talk.remoteMethod('sendEmailToSpeaker', {
        description: 'Email speaker',
        accepts: [{
                arg: 'adminEmail',
                type: 'string'
        },
        {
            arg: 'approved',
            type: 'Boolean'
        },
        {
            arg: 'pending',
            type: 'Boolean'
        },
        {
            arg: 'speakerEmail',
            type: 'string'
        },
        {
            arg: 'speakerName',
            type: 'string'
        },
        {
            arg: 'meetupTitle',
            type: 'string'
        },
        {
            arg: 'meetupDate',
            type: 'string'
        },
       ],
        http: {
            path: '/sendEmailToSpeaker',
            veb: 'get'
        },
        returns: {
            arg: 'data',
            type: 'array',
            root: true
        }
    })
}
