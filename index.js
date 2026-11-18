const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const nocache = require('nocache');
const passport = require('passport');
require('./middlewares/passport');

dotenv.config();

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();
const port = process.env.PORT || 3000;

if (!process.env.mongo_url) {
    throw new Error('mongo_url must be configured before starting the application.');
}
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET must be configured before starting the application.');
}

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    }
}));

app.use(flash());
app.use(nocache());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
app.use('/productImages', express.static('upload'));

app.use('/', userRoute);
app.use('/admin', adminRoute);

app.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/callback', passport.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure'
}));

app.get('/auth/callback/success', (req, res) => {
    if (req.user) {
        return res.redirect('/home');
    }
    return res.redirect('/login');
});

app.get('/auth/callback/failure', (_req, res) => {
    res.send('Authentication failed');
});

async function startServer() {
    await mongoose.connect(process.env.mongo_url);
    app.listen(port, () => {
        console.log('E-commerce application listening on port ' + port);
    });
}

startServer().catch((error) => {
    console.error('Failed to start e-commerce application:', error.message);
    process.exit(1);
});
