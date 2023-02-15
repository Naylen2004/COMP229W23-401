import express from 'express';
import passport from 'passport';
// User Model Information
import User from '../models/user.js'; // import user model information

// Import Display Name Utility for Authentication
import {UserDisplayName} from '../utils/index.js';

// Display Functions 

// Login 
export function DisplayLoginPage(req, res, next){
    if(!req.user) {   // req not has unser info 
        return res.render('index', {title: 'Login', 
                                    page: 'auth/login', 
                                    messages: req.flash('loinMessage'),
                                    displayName: UserDisplayName(req)
                                     });  
    }
    return res.redirect('/movie-list'); // already logged it, rediret to . . . 
}
// Registration 
export function DisplayRegistrationPage(req, res,next) {
    if(!res.user) {
        return res.render('index', {
            title: 'Register',
            page: 'auth/register',
            messages: req.flash('registerMessage'),
            displayName: UserDisplayName(req)
        })
    }
}

// Processing Functions - 
// registering a user when "Register" buttoin is clicked
// need to extract this information, make it an entity and save to the database
export function ProcessRegisterPage(req,res,next) {
    let newUser = new User({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName  // concat of two names 
    })

    User.register(newUser, req.body.password, function(err) {
        //***** ERROR ****** 
        if(err){
            if(err.name == "UserExistsError"){
                console.error('ERROR: User Already Exists!')
                req.flash('registerMessage','err.name');
            } else {
                console.error(err.name);
                req.flash('registerMessage','Server Error');
            }
            return res.redirect('/register'); //need to show reigstration page and flash message 
        }
        //***** SUCCESS *******/
        //authenticate the user using local strategy and after call the funciton 
        return passport.authenticate('local')(req,res,function(){
            return res.redirect('/'); // redirect to main page
        })
    })
}

export function ProcessLoginPage(req, res, next){
    passport.authenticate('local', function (err, user, info){
        if(err){
            console.error(err);
            res.end(err);
        }
        if(!user){
            // 'lgonMessage' is a box and the other part is the message
            req.flash('loginMessage', 'Authentication Error');
        }
        // when call login, your saving the user info in the session
        req.logIn(user,function(err){
            if(err){
                console.error(err);
                res.end(err);
            }
            return res.redirect('/')
        })
    })(req, res, next); // shortuct, executign function from here
}

// logout, need to clear the session
export function ProcessLogoutPage(req,res,next) {
    req.logOut(function(err) {
        if(err){
            console.error(err);
            res.end(err);
        }
        console.log('user logged out successfully');
    })
    res.redirect('/login')  // because logged out, redirect to login page
}