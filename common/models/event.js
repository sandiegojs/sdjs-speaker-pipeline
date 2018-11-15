'use strict';

module.exports = function(Event) {
	Event.getEvents = function (cb) {
		getEvents()
			.then(response => cb(null, response))
			.catch(err => cb(err))
	}
	
	Event.remoteMethod('getEvents', {
		description: 'Gets all events, descriptions, and speakers.',
		http: {
			path: '/getEvents',
			verb: 'get'
		},
		returns: {
			arg: 'data',
			type: 'array',
			root: true
		}
	})
};
