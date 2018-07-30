/* Handles popup windows, mainly that deal with
authentication. */

const express = require('express');
const router = express.Router();
const path = require('path');

// Routes for self-closing OAuth popups
router.get('/authsuccess', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/popups/authsuccess/index.html'));
});

router.get('/authfailure', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/popups/authfailure/index.html'));
});

router.get('/registerredirect', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/popups/registerredirect/index.html'));
});

module.exports = router;