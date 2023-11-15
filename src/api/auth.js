import axios from "./axios";


export const registerRequest = user => axios.post(`/user`,user);
export const loginRequest = user => axios.post(`/session`,user);
export const verificationCodeRequest = data => axios.post(`/user/code`,data);
export const verifyTokenRequest = async () => axios.get(`/session`);

