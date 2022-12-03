/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Artikel = db.define('artikel', {
  judul: DataTypes.STRING,
  deskripsi: DataTypes.STRING,
  foto: DataTypes.STRING,
  url_foto: DataTypes.STRING,
  pengunggah: DataTypes.STRING,
}, {
  freezeTableName: true,
});

export default Artikel;

(async () => {
  await db.sync();
})();
