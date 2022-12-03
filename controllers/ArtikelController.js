/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import Artikel from '../models/Artikel.js';

// Function untuk melihat semua data
export const getArtikel = async (req, res) => {
  try {
    const response = await Artikel.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk melihat data berdasarkan ID
export const getArtikelById = async (req, res) => {
  try {
    const response = await Artikel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk menambahkan data
export const createArtikel = (req, res) => {
  if (req.judul === null) return res.status(400).json({ msg: 'Nama kosong' });
  if (req.pengunggah === null) return res.status(400).json({ msg: 'Email kosong' });

  const { judul } = req.body;
  const { deskripsi } = req.body;
  const { pengunggah } = req.body;
  const file = req.files.foto;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/images/artikel/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid Images' });
  if (fileSize > 10000000) return res.status(422).json({ msg: 'Image must be less than 10 MB' });

  file.mv(`./public/images/artikel/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Artikel.create({
        judul,
        deskripsi,
        foto: fileName,
        url_foto: url,
        pengunggah,
      });
      res.status(201).json({ msg: 'Artikel Created Successfuly' });
    } catch (error) {
      console.log(error.message);
    }
  });
};
// Function untuk mengupdate data
export const updateArtikel = async (req, res) => {
  const artikel = await Artikel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!artikel) return res.status(404).json({ msg: 'No Data Found' });

  let fileName = '';
  if (req.files === null) {
    fileName = artikel.foto;
  } else {
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid Images' });
    if (fileSize > 10000000) return res.status(422).json({ msg: 'Image must be less than 10 MB' });

    const filepath = `./public/images/artikel/${artikel.foto}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/artikel/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const { judul } = req.body;
  const { deskripsi } = req.body;
  const { pengunggah } = req.body;
  const url = `${req.protocol}://${req.get('host')}/images/artikel/${fileName}`;

  try {
    await Artikel.update({
      judul,
      deskripsi,
      foto: fileName,
      url_foto: url,
      pengunggah,
    }, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Artikel Updated Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk menghapus data
export const deleteArtikel = async (req, res) => {
  const artikel = await Artikel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!artikel) return res.status(404).json({ msg: 'No Data Found' });

  try {
    const filepath = `./public/images/artikel/${artikel.foto}`;
    fs.unlinkSync(filepath);
    await Artikel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Artikel Deleted Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
