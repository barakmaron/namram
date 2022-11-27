import { UsersModel } from "../../db/models/index.js";

async function FindUser(email) {
    return UsersModel.findOne({
        where: {
            Email: email
        }
    });
}

const UsersDB = {
    FindUser
};

export default UsersDB;