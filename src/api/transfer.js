import axios from "./axios";


export const transferRequest = data => axios.put(`/user/credit`,data);