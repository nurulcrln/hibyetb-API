/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import Reminder from '../models/Reminder.js';

// Function untuk melihat semua data
export const getReminder = async (req, res) => {
  try {
    const response = await Reminder.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk melihat data berdasarkan ID
export const getReminderById = async (req, res) => {
  try {
    const response = await Reminder.findOne({
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
export const createReminder = (req, res) => {
  const { tgl_mulai } = req.body;
  const { tgl_selesai } = req.body;
  const { jam_pagi } = req.body;
  const { ket_pagi } = req.body;
  const { jam_siang } = req.body;
  const { ket_siang } = req.body;
  const { jam_malam } = req.body;
  const { ket_malam } = req.body;
  const { total_hari } = req.body;

  try {
    Reminder.create({
      tgl_mulai,
      tgl_selesai,
      jam_pagi,
      ket_pagi,
      jam_siang,
      ket_siang,
      jam_malam,
      ket_malam,
      total_hari,
    });
    res.status(201).json({ msg: 'Reminder Created Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk mengupdate data
export const updateReminder = async (req, res) => {
  const user = await Reminder.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: 'No Data Found' });

  const { tgl_mulai } = req.body;
  const { tgl_selesai } = req.body;
  const { jam_pagi } = req.body;
  const { ket_pagi } = req.body;
  const { jam_siang } = req.body;
  const { ket_siang } = req.body;
  const { jam_malam } = req.body;
  const { ket_malam } = req.body;
  const { total_hari } = req.body;

  try {
    await Reminder.update({
      tgl_mulai,
      tgl_selesai,
      jam_pagi,
      ket_pagi,
      jam_siang,
      ket_siang,
      jam_malam,
      ket_malam,
      total_hari,
    }, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Reminder Updated Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk menghapus data
export const deleteReminder = async (req, res) => {
  const user = await Reminder.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: 'No Data Found' });

  try {
    await Reminder.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Reminder Deleted Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
