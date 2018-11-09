'use strict';

const { getMeetups } = require('../../server/utils/getMeetups');
const { talkSubmit } = require('../../server/utils/talkSubmit')
const { getTalkDetails } = require('../../server/utils/getTalkDetails');
const { changeTalkStatus } = require('../../server/utils/changeTalkStatus');
const { sendEmailToSpeaker } = require('../../server/utils/sendGridEmailer');
const { formatTalkForEmail } = require('../../server/utils/formatTalkForEmail');

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

	Talk.talkSubmit = function (speakerInfo, talkInfo, date, cb) {
		talkSubmit(speakerInfo, talkInfo, date)
			.then(response => cb(null, response))
			.catch(err => cb(err))
	}

	Talk.remoteMethod('talkSubmit', {
		description: 'Adds speaker, event, and talk.',
		accepts: [{
			arg: 'speakerInfo',
			type: 'object'
		},
		{
			arg: 'talkInfo',
			type: 'object'
		},
		{
			arg: 'date',
			type: 'string'
		}],
		http: {
			path: '/talkSubmit',
			verb: 'post'
		},
		returns: {
			arg: 'data',
			type: 'root',
			root: true
		}
	})

	Talk.getTalkDetails = function (cb) {
		getTalkDetails()
			.then(talkInformation => cb(null, talkInformation))
			.catch(err => cb(err))
	}

	Talk.remoteMethod('getTalkDetails', {
		description: 'Gets all talks and returns an object formatted with event info and speaker info.',
		http: {
			path: '/getTalkDetails',
			verb: 'get'
		},
		returns: {
			arg: 'data',
			type: 'array',
			root: true
		}
	})

	Talk.changeTalkStatus = function (talkId, selectedStatus, cb) {
		changeTalkStatus(talkId, selectedStatus)
			.then(newTalk => cb(null, newTalk))
			.catch(err => cb(err))
	}

	Talk.remoteMethod('changeTalkStatus', {
		description: 'Approves or Denies talk status',
		accepts: [{
			arg: 'talkId',
			type: 'string'
		},
		{
			arg: 'selectedStatus',
			type: 'string'
		}],
		http: {
			path: '/changeTalkStatus',
			verb: 'put'
		},
		returns: {
			arg: 'data',
			type: 'array',
			root: true
		}
	})

	Talk.sendEmailToSpeaker = function (adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate, cb) {
		sendEmailToSpeaker(adminEmail, approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate, cb)
			.then(email => cb(null, email))
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

	Talk.afterRemote('talkSubmit', function (ctx, modelInstance, next) {
		const speakerId = ctx.result.speakerId
		const eventId = ctx.result.eventId
		const approved = false
		const pending = true
		formatTalkForEmail(speakerId, eventId, next)
			.then((response) => {
				const speakerName = response.speakerName;
				const speakerEmail = response.speakerEmail;
				const meetupTitle = response.meetupTitle;
				const meetupDate = response.meetupDate;
				sendEmailToSpeaker('tiana.hayden@me.com', approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate)
				next();
			})
			.catch(err => ({ error: 'error with formatTalkForEmail function', err }))
	});

	Talk.afterRemote('changeTalkStatus', function (ctx, modelInstance, next) {
		const speakerId = ctx.result.speakerId;
		const eventId = ctx.result.eventId;
		const approved = ctx.result.approved;
		const pending = false;
		formatTalkForEmail(speakerId, eventId, next)
			.then((response) => {
				const speakerName = response.speakerName;
				const speakerEmail = response.speakerEmail;
				const meetupTitle = response.meetupTitle;
				const meetupDate = response.meetupDate;
				sendEmailToSpeaker('tiana.hayden@me.com', approved, pending, speakerEmail, speakerName, meetupTitle, meetupDate)
				next();
			})
			.catch(err => ({ error: 'error with formatTalkForEmail function', err }))

	});
};
