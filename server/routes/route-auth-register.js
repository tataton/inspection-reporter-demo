/* Handles authentication requests for registration, to
endpoint '/auth/register..'.  There are separate subroutes
for different auth providers (Google, Facebook etc.).*/

const express = require('express');
const router = express.Router();

/** ------ SUBROUTES FOR AUTH PROVIDERS ------ **/
const registerGoogle = require('./auth-providers/route-register-google');
router.use('/google', registerGoogle);

module.exports = router;