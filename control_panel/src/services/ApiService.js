import axios from 'axios';

const sender = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
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


export async function StaticFileLoader(file_name, type) {
    try {
        const base_url = process.env.REACT_APP_API_BASE_URL;
        const res = await sender.get(`${base_url}/${type}/${file_name}`,{
            responseType: 'blob'
        });
        return res.data;
    } catch (err) {
        throw err;
    }
}

export function GetImageUrl(image) {
    const base_url = process.env.REACT_APP_API_BASE_URL;
    return `${base_url}/images/${image}`;
}