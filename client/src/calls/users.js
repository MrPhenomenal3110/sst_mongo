import { axiosInstance } from "./index.js";

export const RegisterUsers = async (data) => {
    try{
        const response = await axiosInstance.post('api/users/register', data);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}
export const LoginUsers = async (data) => {
    try{
        const response = await axiosInstance.post('api/users/login', data);
        return response.data;
    } catch(err) {
        console.error(err);
    }
}