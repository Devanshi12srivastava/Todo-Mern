import express from 'express';
import testingController from '../controllers/testController.js';

const router=express.Router();

router.get('/',testingController);

export default router;