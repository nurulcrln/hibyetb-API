/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import express from 'express';
import {
  getReminder,
  getReminderById,
  createReminder,
  updateReminder,
  deleteReminder,
} from '../controllers/ReminderController.js';

const router = express.Router();

router.get('/reminder', getReminder);
router.get('/reminder/:id', getReminderById);
router.post('/reminder', createReminder);
router.put('/reminder/:id', updateReminder);
router.delete('/reminder/:id', deleteReminder);

export default router;
