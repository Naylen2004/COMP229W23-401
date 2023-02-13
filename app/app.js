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

// Import Mongoose module
import mongoose from 'mongoose';

//Configuration Module - s/b instance for config module
import { Secret, MongoURI } from '../config/index.js'; 

// Import Routes
import indexRouter from '../app/routes/index.js';
import moviesRouter from '../app/routes/movies.js';

// Complete DB Configuration
mongoose.connect(MongoURI);
const db = mongoose.connection;

// Database Listeners
db.on('open', () => console.log(`Connected to MongoDB`)); //** password now not vailable 
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
app.use(express.static(path.join(_dirname, 'public')));
app.use(express.static(path.join(_dirname, '../public')));
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));


// Use Routs 
app.use('/',indexRouter);
app.use('/', moviesRouter);

export default app;  // export app variable as default module 

