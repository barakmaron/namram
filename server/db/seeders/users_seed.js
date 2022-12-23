'use strict';
import { v4 as uuid } from 'uuid';

/** @type {import('sequelize-cli').Migration} */

async function up (queryInterface, Sequelize) {
  try {
    return await queryInterface.bulkInsert('Users', [{
      id: uuid(),
      Email: "barak062@gmail.com",
      Password: "ab07ee36ba2b5e021c09fca2c8a57c821a4f9165f6e5e7260c120e4216465ad97aa0cced88f3be42f0388bd249199beb588542442e95996658b43c4ec1dc850f"
    }, {
      id: uuid(),
      Email: "verd@namram.co.il",
      Password: "cc14ff47bda71ace3ff2c77ab55c73adc246d48af91cf9554ef731f95a52d803d4a6837c42638b859fb0b203beec69b9f735be4fda701438e06c685cfc62a996"
    }, {
      id: uuid(),
      Email: "nadav@namram.co.il",
      Password: "d14b5a5caefe91534e773706cc51bfc39b17d458ba0079c72819518efd5705b833cce9e19842880b7f7708160d51be4981439b39886b9bc56a20f42a9c9edc0e"
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