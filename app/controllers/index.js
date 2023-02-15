
/**
 * File name:    index.js **  Controller 
 * Student name: Krishna Ramlakhan
 * Student ID:   818583171 
 * Date:         Feb 3, 2023
 */
import {UserDisplayName } from "../utils/index.js";

export function displayHomePage(req, res,next) {
    res.render('index', {title: 'Home', page: 'home',displayName: UserDisplayName(req)});
}

export function displayAboutPage(req, res,next) {
    res.render('index', {title: 'About', page: 'about',displayName: UserDisplayName(req)});  
}

export function displayServicesPage(req, res,next) {
    res.render('index', {title: 'Services', page: 'services',displayName: UserDisplayName(req)});  
}

export function displayProjectsPage(req, res,next) {
    res.render('index', {title: 'Projects', page: 'projects',displayName: UserDisplayName(req)});
}

export function displayContactPage(req, res,next) {
    res.render('index', {title: 'Contact', page: 'contact',displayName: UserDisplayName(req)});
}