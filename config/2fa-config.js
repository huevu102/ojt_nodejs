const authenticator = require('otplib')
const GoogleAuthenticator = require('passport-2fa-totp').GoogeAuthenticator
const TwoFAStartegy = require('passport-2fa-totp').Strategy

const User = require('../models/user-model')


passport.use(new TwoFAStartegy(function (email, password, done) {
    // 1st step verification: username and password

    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
    });
}, function (user, done) {
    // 2nd step verification: TOTP code from Google Authenticator

    if (!user.secret) {
        done(new Error("Google Authenticator is not setup yet."));
    } else {
        // Google Authenticator uses 30 seconds key period
        // https://github.com/google/google-authenticator/wiki/Key-Uri-Format

        var secret = GoogleAuthenticator.decodeSecret(user.secret);
        done(null, secret, 30);
    }
}))
