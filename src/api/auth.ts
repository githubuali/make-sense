import axios from "axios";

const baseURL: string = import.meta.env.VITE_API_URL as string;

const sendCredentials = { withCredentials: true };

//Login: POST
export const loginApi = (loginData: { username: string; password: string }) =>
    axios.post(`${baseURL}/auth/login`, loginData, sendCredentials);

//Logout: POST
export const logoutApi = () => axios.post(`${baseURL}/auth/logout`, {}, sendCredentials);

//Validate: POST
export const validateApi = async () => {
    return await axios.get(`${baseURL}/auth/session`, sendCredentials);
};

//Validate Token
export const validateToken = (token: string) =>
    axios.post(`${baseURL}/auth/changePassword/token/${token}/validate`, sendCredentials);