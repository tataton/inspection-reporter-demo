/* Handles authentication requests for login, to
endpoint '/auth/login..'.  There are separate subroutes
for different auth providers (Google, Facebook etc.).*/

const express = require('express');
const router = express.Router();

/** ------ SUBROUTES FOR AUTH PROVIDERS ------ **/
const loginGoogle = require('./auth-providers/route-login-google');
router.use('/google', loginGoogle);

module.exports = router;