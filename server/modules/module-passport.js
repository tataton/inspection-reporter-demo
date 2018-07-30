/* Module that configures passport for both read- and
write-access login, and then exports its instance. */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_LOGIN_CALLBACK_URL = `${process.env.CALLBACK_PROTOCOL}://${process.env.CALLBACK_FQDN}/auth/login/google/callback`;
const GOOGLE_REGISTER_CALLBACK_URL = `${process.env.CALLBACK_PROTOCOL}://${process.env.CALLBACK_FQDN}/auth/register/google/callback`;

const User = require('../services/service-database').User;

const googleProfileHandler = (accessToken, refreshToken, profile, done) => {
    
    // Is this user's Google account associated with an
    // Oak Tree account? If so, great. If not, create a temp
    // account with (isTemporary == true), and
    // provide the user with the opportunity to register.

    const googleID = profile.id;
    const userEmailObject = profile.emails.find(emailObject => (emailObject.type == 'account'))
    const googleEmail = userEmailObject.value;

    User.findOrCreate({ where: {googleID},
                        defaults: { googleEmail,
                                    isAdmin: false,
                                    isTemporary: true}})
        .spread(user => done(null, user))
        .catch(err => done(err));
}

passport.use('google-login', new GoogleStrategy({
    // Strategy that authorizes users that already have an
    // Oak Tree account.

    // Configure Google auth strategy in passport:
    clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
    clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
    callbackURL: GOOGLE_LOGIN_CALLBACK_URL

}, googleProfileHandler));


passport.use('google-register', new GoogleStrategy({
    // Strategy that authorizes users that are signing up for
    // a new account.
     
    // Configure Google auth strategy in passport:
    clientID: process.env.GOOGLE_REGISTER_CLIENT_ID,
    clientSecret: process.env.GOOGLE_REGISTER_CLIENT_SECRET,
    callbackURL: GOOGLE_REGISTER_CALLBACK_URL
    
}, googleProfileHandler));


passport.serializeUser((user, done) => {
    // errorCode is serialized with user info.
    const serializedObject = {
        id: user.id,
        errorCode: 0
    };
    done(null, serializedObject);
});

passport.deserializeUser((userObject, done) => {
    // At this point, user should be in our
    // database. Search for user's info:
    User.findById(userObject.id)
        .then(user => done(null, user))
        .catch(err => done(err))
});

module.exports = passport;