/* Handles authentication requests for login, logout,
and identification, to endpoint '/auth..'. */

const express = require('express');
const router = express.Router();

const User = require('../services/service-database').User;

/** ---- SUBROUTES FOR DIFFERENT 3rd PARTY AUTH NEEDS ---- **/
const authLogin = require('./route-auth-login');
router.use('/login', authLogin);
const authRegister = require('./route-auth-register');
router.use('/register', authRegister);


router.post('/registrationform', (req, res) => {
    if (req.user.id) {
        User.findOne({where: {email: req.body.email}})
            // This is actually technically an error case; there
            // should be no users with the input e-mail address in
            // the database. (Right?)
            .then((record) => {
                res.json({success: false, emailUsed: true})
            })
            // If not, update user's info.
            .catch(() => {
                return User.findById(req.user.id)
                    .then(tempuser => tempuser.update({
                            email: req.body.email,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            isTemporary: false
                    }))
                    .then(() => {
                        res.redirect('/');
                        return null;
                    })
            })
    } else {
        // This really shouldn't ever happen.
        res.sendStatus(200);
    }
});

router.get('/cancelreg', (req, res) => {
    // Called when temporary user cancels/abandons registration.
    // Deletes user's temporary record in the database.
    if (req.user.id && req.user.isTemporary) {
        const recordToDelete = req.user.id;
        req.logout();
        User.findById(recordToDelete)
            .then(tempuser => tempuser.destroy())
    }
    res.sendStatus(200);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;