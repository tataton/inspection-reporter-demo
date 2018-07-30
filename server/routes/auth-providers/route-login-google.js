/* Specifically handles Google OAuth2 authentication
requests, to endpoint '/auth/login/google..'. This
route branch is dedicated to login; registration is
handled in a separate route branch. */

const express = require('express');
const router = express.Router();
const passport = require('../../modules/module-passport');

router.get('/', passport.authenticate('google-login',
    {
        scope: ['openid', 'profile', 'email'],
        prompt: 'select_account',
        failureRedirect: '/'
    }
));

router.get('/callback', passport.authenticate('google-login',
    // Failure should bring them to same error place as above. ("There
    // was a problem with your Google login; please try again.")
    {failureRedirect: '/'}),
    // Success means either that user has been authenticated, or that
    // user has been issued a temp account so they might register.
    (req, res) => {
        res.redirect('/popup/authsuccess');
    }
);

module.exports = router;