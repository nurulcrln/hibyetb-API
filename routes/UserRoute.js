/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import express from 'express';
import {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/UserController.js';

const router = express.Router();

router.get('/user', getUser);
router.get('/user/:id', getUserById);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
