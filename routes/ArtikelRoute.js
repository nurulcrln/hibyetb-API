/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import express from 'express';
import {
  getArtikel,
  getArtikelById,
  createArtikel,
  updateArtikel,
  deleteArtikel,
} from '../controllers/ArtikelController.js';

const router = express.Router();

router.get('/artikel', getArtikel);
router.get('/artikel/:id', getArtikelById);
router.post('/artikel', createArtikel);
router.put('/artikel/:id', updateArtikel);
router.delete('/artikel/:id', deleteArtikel);

export default router;
