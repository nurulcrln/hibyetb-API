/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Reminder = db.define('reminder', {
  tgl_mulai: DataTypes.DATE,
  tgl_selesai: DataTypes.DATE,
  jam_pagi: DataTypes.TIME,
  ket_pagi: DataTypes.STRING,
  jam_siang: DataTypes.TIME,
  ket_siang: DataTypes.STRING,
  jam_malam: DataTypes.TIME,
  ket_malam: DataTypes.STRING,
  total_hari: DataTypes.INTEGER,

}, {
  freezeTableName: true,
});

export default Reminder;

(async () => {
  await db.sync();
})();
