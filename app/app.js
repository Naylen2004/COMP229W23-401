/**
 * File name:    app.js **  app 
 * Student name: Krishna Ramlakhan
 * Student ID:   818583171 
 * Date:         Feb 3, 2023
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
 
// ES2022 Modules fix for _dirname - just to find the folders
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const _dirname = dirname(fileURLToPath(import.meta.url));

//---- Auth Step 1 - import passport modules 
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

//--- Auth Step 2 - define authenation strategy
let localStrategy = passportLocal.Strategy;  //authenticates users using a username and password

//--- Auth Step 3 - iport user model 
import User from './models/user.js';

// Import Mongoose module
import mongoose from 'mongoose';

//Configuration Module - s/b instance for config module
import { Secret, MongoURI } from '../config/index.js'; 

// Import Routes
import indexRouter from '../app/routes/index.js';
import moviesRouter from '../app/routes/movies.js';
import authRouter from '../app/routes/auth.js';

// Complete DB Configuration
mongoose.connect(MongoURI);
const db = mongoose.connection;

// Database Listeners
db.on('open', () => console.log(`Connected to MongoDB, status code: `,db.readyState)); //** password now not vailable 
db.on('error', () => console.log("Mongo Connection Error"));


// Instantiat the expresss application
const app = express();

// Setup Express Middleware

// EJS Setup
app.set('views', path.join(_dirname, '/views'));
app.set('view engine','ejs');

// General Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(express.static(path.join(_dirname, 'public')));
app.use(express.static(path.join(_dirname, '../public')));

//Auth Step 4 - Setup Express Session
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));

// Auth Step 5 - Setup Flash
app.use(flash());

// Auth Step 6 -  Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// Auth Step 7 - Implementing the Auth strategy
passport.use(User.createStrategy());

// Auth Step 8 - Setup serilization and deserilization - \
//             - converts objects to text and back
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use Routes 
app.use('/',indexRouter);
app.use('/', moviesRouter);
app.use('/', authRouter);

export default app;  // export app variable as default module 

