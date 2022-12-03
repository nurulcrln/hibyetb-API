/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Dokter = db.define('dokters', {
  nama: DataTypes.STRING,
  email: DataTypes.STRING,
  foto: DataTypes.STRING,
  url_foto: DataTypes.STRING,
  spesialis: DataTypes.STRING,
  tempat_praktik: DataTypes.STRING,
  phone: DataTypes.INTEGER,
}, {
  freezeTableName: true,
});

export default Dokter;

(async () => {
  await db.sync();
})();
