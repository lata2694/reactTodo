/**
 * Created by lata on 25/12/18.
 */

import express from 'express';
let router = express.Router();
import services from './query.js'

router.get('/', services.gettodo);
router.get('/sort', services.sorttodo);
router.post('/submit', services.addtodo);
router.put('/edit', services.edittodo);
router.delete('/remove', services.deletetodo);

export default router;