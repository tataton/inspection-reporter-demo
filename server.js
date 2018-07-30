const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const sessionConfig = require('./server/config/config-session');

if ((process.env.NODE_ENV == 'production') ||
    (process.env.NODE_ENV == 'development')) {
    app.set('trust proxy', 1);
}
// Otherwise, process.env.NODE_ENV == 'staging', so no proxy used.

app.use(helmet());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

/** ---------- ROUTES ---------- **/
const auth = require('./server/routes/route-auth');
app.use('/auth', auth);
const state = require('./server/routes/route-state');
app.use('/state', state);
const popup = require('./server/routes/route-popup');
app.use('/popup', popup);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}.`);