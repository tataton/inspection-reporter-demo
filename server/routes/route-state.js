/* Handles requests for application state info,
to endpoint '/state..'. */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Server will return state to client if user has logged in,
    // either with an Oak Tree user account (isTemporary == false)
    // or via an auth provider without an associated Oak Tree
    // account (isTemporary == true).
    if (req.isAuthenticated()) {
        // (req.isAuthenticated() == true) in either case.
        const userObject = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            errorCode: 0,
        };
        if (req.session.passport.user.errorCode) {
            // (errorCode > 0) gets sent just once, to trigger client-side
            // error message.
            userObject.errorCode = req.session.passport.user.errorCode;
            req.session.passport.user.errorCode = 0;
            req.session.save();
        }
        userObject.isTemporary = req.user.isTemporary;
        userObject.isAdmin = req.user.isAdmin;
        res.send(userObject);
    } else {
        // User hasn't logged in yet.
        res.sendStatus(403);
    }
});

module.exports = router;