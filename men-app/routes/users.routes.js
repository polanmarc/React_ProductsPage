import express from 'express';
import userManagement from '../controller/users.controller.js';

const router = express.Router();

router.post('/login', userManagement.loginUser);
router.post('/register', userManagement.registerUser);
router.post('/logOut', userManagement.logOut);

export default router;