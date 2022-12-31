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
      Password: "68f5815aae1023da23f231491271775edf5c163940bb95e10c9e31a85c4c18d7a9ea10ae8149a563294c9260326c33dccde524314e88e657170fedf2099fb523"
    }, {
      id: uuid(),
      Email: "nadav@namram.co.il",
      Password: "68f5815aae1023da23f231491271775edf5c163940bb95e10c9e31a85c4c18d7a9ea10ae8149a563294c9260326c33dccde524314e88e657170fedf2099fb523"
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
