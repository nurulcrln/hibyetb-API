/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const User = db.define('users', {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  nik: DataTypes.INTEGER,
  age: DataTypes.INTEGER,
  phone: DataTypes.INTEGER,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
}, {
  freezeTableName: true,
});

export default User;

(async () => {
  await db.sync();
})();
