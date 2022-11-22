import axios from 'axios';

export default async function SendApiRequest(url, method = "get", params = undefined) {
    try {
        axios.defaults.withCredentials = true;
        const base_url = process.env.REACT_APP_API_BASE_URL;
        const res = await axios[method](`${base_url}${url}`, params);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function StaticFileLoader(file_name, type) {
    try {
        const base_url = process.env.REACT_APP_API_BASE_URL;
        const res = await axios.get(`${base_url}/${type}/${file_name}`,{
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