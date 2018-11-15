'use strict';

const { sendEmailToNewAdmin } = require('../../server/utils/sendGridEmailer');

module.exports = function(Organizer) {
    console.log('hello from organizer.js model')
    Organizer.afterRemote('create', function (ctx, modelInstance, next) {
        console.log('this is ctx: ', ctx.result)
        console.log('this is ctx:.result.username ', ctx.result.username)
        console.log('this is ctx.result.email: ', ctx.result.email)
        const username = ctx.result.username;
        const email = ctx.result.email;
        sendEmailToNewAdmin(username, email)
        next();
    });

};
