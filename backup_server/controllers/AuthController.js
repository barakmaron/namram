import SendApiRequest, { API_REQUEST_METHODS } from "../services/ApiService.js";

export default async function Login(){
    try {
        const login = await SendApiRequest(`/auth/login`, API_REQUEST_METHODS.POST, {
            Email: process.env.Email,
            Password: process.env.Password
        });
        return {
            status: true,
            error: null,
            value: login
        };
    } catch (err) {
        throw err;
    }
}