/* Specifically handles Google OAuth2 authentication
requests, to endpoint '/auth/register/google..'. This
route branch is dedicated to registration; login is
handled in a separate route branch. */

const express = require('express');
const router = express.Router();
const passport = require('../../modules/module-passport');

router.get('/', passport.authenticate('google-register',
    {
        scope: ['openid', 'profile', 'email'],
        prompt: 'select_account',
        failureRedirect: '/'
    }
));

router.get('/callback', passport.authenticate('google-register',
    // Failure should bring them to same error place as above. ("There
    // was a problem with your Google login; please try again.")
    {failureRedirect: '/'}),
    // Success means either that user has been issued a temp account
    // so they might register, or--unlikely--that they already registered
    // and they forgot, so they can just be logged in.
    (req, res) => {
        res.redirect('/popup/authsuccess');
    }
);

module.exports = router;