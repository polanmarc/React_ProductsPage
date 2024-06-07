import express from 'express';
import notesManagement from '../controller/notes.controller.js';
import privateRoute from '../middleware/privateRoute.js';

const router = express.Router();

router.post('/readAll', privateRoute, notesManagement.readAll);
router.post('/create', privateRoute, notesManagement.create);
router.post('/searchByAuthor', privateRoute, notesManagement.searchByAuthor);
router.post('/update', privateRoute, notesManagement.update);
router.post('/delete', privateRoute, notesManagement.delete);

export default router;