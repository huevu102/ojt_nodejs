const User = require('../models/user-model')

const LocalStrategy = require("passport-local")
const GoogleAuthenticator = require('passport-2fa-totp').GoogeAuthenticator
const { authenticator } = require("otplib")

module.exports = (passport) => {
    passport.use(
      "local-login",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true,
        },
        async (req, username, password, done) => {
          console.log("local-login call");
          try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, "Invalid email or password.");
            const isMatch = await user.matchPassword(password);
            if (!isMatch) return done(null, false, "Invalid email or password.");
            // if passwords match return user and user not setting 2fa
            if(user.status != 1) return done(null, false, "Your account have been disable.");
            if(!user.secret)
              return done(null, user);
            if(!req.body.code || !authenticator.check(req.body.code, user.secret)){
              return done(null, false, "Invalid Authenticator Code");
            }
            return done(null, user);
          } catch (error) {
            console.log(error);
            return done(error, false, "Something went wrong");
          }
        }
        
      )
    );
    passport.serializeUser(function (user, done) {
      process.nextTick(function() {
          const ssData = {
              id: user.id
          }
          ssData.is2FAActive = !!user.secret;
          if(!ssData.is2FAActive){
              const data = GoogleAuthenticator.register(user.email);
              ssData.secret = data.secret;
              ssData.qr = data.qr;
          }
          done(null, ssData);
      });
    });
  
    passport.deserializeUser(function (user, done) {
      User.findById(user.id)
        .then(function (user) {
          done(null, user);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  };
  