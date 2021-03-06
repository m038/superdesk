'use strict';

var backendRequestAuth = require('./backend').backendRequestAuth;
var pp = browser.params;

exports.resetApp = resetApp;
exports.post = post;

function resetApp(fixture_profile, callback) {
    backendRequestAuth({
        uri: '/prepopulate',
        method: 'POST',
        json: {
            'profile': fixture_profile
        }
    }, function(e, r, j) {
        pp.token = null;
        callback(e, r, j);
    });
}

function post(params, callback) {
    params.method = 'POST';
    backendRequestAuth(params, callback);
}
