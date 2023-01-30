'use strict';
import { v4 as uuid } from 'uuid';

/** @type {import('sequelize-cli').Migration} */

async function up (queryInterface, Sequelize) {
  try {
    return await queryInterface.bulkInsert('Users', []);
  } catch (err) {
    throw err;
  }
}

export async function down (queryInterface, Sequelize) {
  return await queryInterface.bulkDelete('Users', null, {});
}


export default async function RunSeed (queryInterface, sequelize) {
  try {
    await up(queryInterface, sequelize);
  } catch (err) {
    console.error(err.message);
  }
}
