import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const sender = axios.create({
    baseURL: process.env.API_BASE_URL
});

export default async function SendApiRequest(url, method = "get", params = undefined) {
    try {
        sender.defaults.withCredentials = true;
        const res = await sender[method](`${url}`, params);
        if(res.headers["set-cookie"]){
            const [cookie] = res.headers["set-cookie"];
            sender.defaults.headers.Cookie = cookie;
        }
        return res.data;
    } catch (err) {
        throw err;
    }
}


export const API_REQUEST_METHODS = {
    GET: "get",
    POST: "post",
    PUT: "put",
    PATCH: "patch",
    DELETE: "delete"
};