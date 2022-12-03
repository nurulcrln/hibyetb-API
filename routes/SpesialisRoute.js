/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import express from 'express';
import {
  getSpesialis,
  getSpesialisById,
  createSpesialis,
  updateSpesialis,
  deleteSpesialis,
} from '../controllers/SpesialisController.js';

const router = express.Router();

router.get('/spesialis', getSpesialis);
router.get('/spesialis/:id', getSpesialisById);
router.post('/spesialis', createSpesialis);
router.put('/spesialis/:id', updateSpesialis);
router.delete('/spesialis/:id', deleteSpesialis);

export default router;
