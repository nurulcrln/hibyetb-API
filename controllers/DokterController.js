/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import Dokter from '../models/Dokter.js';

// Function untuk melihat semua data
export const getDokter = async (req, res) => {
  try {
    const response = await Dokter.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk melihat data berdasarkan ID
export const getDokterById = async (req, res) => {
  try {
    const response = await Dokter.findOne({
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
export const createDokter = (req, res) => {
  if (req.nama === null) return res.status(400).json({ msg: 'Nama kosong' });
  if (req.email === null) return res.status(400).json({ msg: 'Email kosong' });

  const { nama } = req.body;
  const { email } = req.body;
  const { spesialis } = req.body;
  const { tempat_praktik } = req.body;
  const { phone } = req.body;
  const file = req.files.foto;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/images/dokter/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid Images' });
  if (fileSize > 10000000) return res.status(422).json({ msg: 'Image must be less than 10 MB' });

  file.mv(`./public/images/dokter/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Dokter.create({
        nama,
        email,
        foto: fileName,
        url_foto: url,
        spesialis,
        tempat_praktik,
        phone,
      });
      res.status(201).json({ msg: 'Dokter Created Successfuly' });
    } catch (error) {
      console.log(error.message);
    }
  });
};
// Function untuk mengupdate data
export const updateDokter = async (req, res) => {
  const dokter = await Dokter.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dokter) return res.status(404).json({ msg: 'No Data Found' });

  let fileName = '';
  if (req.files === null) {
    fileName = dokter.foto;
  } else {
    const file = req.files.foto;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid Images' });
    if (fileSize > 10000000) return res.status(422).json({ msg: 'Image must be less than 10 MB' });

    const filepath = `./public/images/dokter/${dokter.foto}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/dokter/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const { nama } = req.body;
  const { email } = req.body;
  const { spesialis } = req.body;
  const { tempat_praktik } = req.body;
  const { phone } = req.body;
  const url = `${req.protocol}://${req.get('host')}/images/dokter/${fileName}`;

  try {
    await Dokter.update({
      nama,
      email,
      foto: fileName,
      url_foto: url,
      spesialis,
      tempat_praktik,
      phone,
    }, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Dokter Updated Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk menghapus data
export const deleteDokter = async (req, res) => {
  const dokter = await Dokter.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!dokter) return res.status(404).json({ msg: 'No Data Found' });

  try {
    const filepath = `./public/images/dokter/${dokter.foto}`;
    fs.unlinkSync(filepath);
    await Dokter.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Dokter Deleted Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
