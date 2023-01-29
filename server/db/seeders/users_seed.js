'use strict';
import { v4 as uuid } from 'uuid';

/** @type {import('sequelize-cli').Migration} */

async function up (queryInterface, Sequelize) {
  try {
    return await queryInterface.bulkInsert('Users', [{
      id: uuid(),
      Email: "test@gmail.com",
      Password: "2bbe0c48b91a7d1b8a6753a8b9cbe1db16b84379f3f91fe115621284df7a48f1cd71e9beb90ea614c7bd924250aa9e446a866725e685a65df5d139a5cd180dc9"
    }]);
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
