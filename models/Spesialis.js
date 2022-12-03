/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Spesialis = db.define('spesialis', {
  nama: DataTypes.STRING,
}, {
  freezeTableName: true,
});

export default Spesialis;

(async () => {
  await db.sync();
})();
