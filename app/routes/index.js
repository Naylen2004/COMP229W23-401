import {Router} from 'express';
import {helloWorld,goodbyeWorld} from '../controllers/index.js'
const router = Router();
router.get('/hello',helloWorld);

router.get('/goodbye',goodbyeWorld);

export default router;
