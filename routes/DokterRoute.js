/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import express from 'express';
import {
  getDokter,
  getDokterById,
  createDokter,
  updateDokter,
  deleteDokter,
} from '../controllers/DokterController.js';

const router = express.Router();

router.get('/dokter', getDokter);
router.get('/dokter/:id', getDokterById);
router.post('/dokter', createDokter);
router.put('/dokter/:id', updateDokter);
router.delete('/dokter/:id', deleteDokter);

export default router;
