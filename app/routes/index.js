/**
 * File name:    index.js **  routes  
 * Student name: Krishna Ramlakhan
 * Student ID:   818583171 
 * Date:         Feb 3, 2023
 */

import {Router} from 'express';

//import { route } from 'express/lib/application';
import { displayAboutPage, displayHomePage, displayContactPage, displayProjectsPage, displayServicesPage} from '../controllers/index.js';

const router = Router();
router.get('/', displayHomePage);
router.get('/home', displayHomePage);
router.get('/about', displayAboutPage);
router.get('/services', displayServicesPage);
router.get('/projects', displayProjectsPage);
router.get('/contact', displayContactPage);

export default router;
