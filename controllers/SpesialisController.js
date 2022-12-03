/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import Spesialis from '../models/Spesialis.js';

// Function untuk melihat semua data
export const getSpesialis = async (req, res) => {
  try {
    const response = await Spesialis.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk melihat data berdasarkan ID
export const getSpesialisById = async (req, res) => {
  try {
    const response = await Spesialis.findOne({
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
export const createSpesialis = (req, res) => {
  if (req.nama === null) return res.status(400).json({ msg: 'Nama kosong' });
  const { nama } = req.body;
  try {
    Spesialis.create({ nama });
    res.status(201).json({ msg: 'Spesialis Created Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk mengupdate data
export const updateSpesialis = async (req, res) => {
  const spesialis = await Spesialis.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!spesialis) return res.status(404).json({ msg: 'No Data Found' });

  const { nama } = req.body;

  try {
    await Spesialis.update({ nama }, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'spesialis Updated Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk menghapus data
export const deleteSpesialis = async (req, res) => {
  const spesialis = await Spesialis.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!spesialis) return res.status(404).json({ msg: 'No Data Found' });

  try {
    await Spesialis.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'spesialis Deleted Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
