/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import User from '../models/User.js';

// Function untuk melihat semua data
export const getUser = async (req, res) => {
  try {
    const response = await User.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk melihat data berdasarkan ID
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
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
export const createUser = (req, res) => {
  if (req.username === null) return res.status(400).json({ msg: 'Nama kosong' });
  if (req.email === null) return res.status(400).json({ msg: 'Email kosong' });
  if (req.password === null) return res.status(400).json({ msg: 'Password kosong' });
  const { username } = req.body;
  const { email } = req.body;
  const { nik } = req.body;
  const { age } = req.body;
  const { phone } = req.body;
  const { password } = req.body;
  const { role } = req.body;

  try {
    User.create({
      username,
      email,
      nik,
      age,
      phone,
      password,
      role,
    });
    res.status(201).json({ msg: 'User Created Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk mengupdate data
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: 'No Data Found' });

  const { username } = req.body;
  const { email } = req.body;
  const { nik } = req.body;
  const { age } = req.body;
  const { phone } = req.body;
  const { password } = req.body;
  const { role } = req.body;

  try {
    await User.update({
      username,
      email,
      nik,
      age,
      phone,
      password,
      role,
    }, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'User Updated Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
// Function untuk menghapus data
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: 'No Data Found' });

  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'User Deleted Successfuly' });
  } catch (error) {
    console.log(error.message);
  }
};
