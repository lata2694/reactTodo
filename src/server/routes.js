/**
 * Created by lata on 25/12/18.
 */

import express from 'express';
let router = express.Router();
import query from './query.js'

router.post('/submit', query.addtodo);

export default router;