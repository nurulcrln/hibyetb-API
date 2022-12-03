/* eslint-disable linebreak-style */
import { Sequelize } from 'sequelize';

const db = new Sequelize('db_hibyetb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
