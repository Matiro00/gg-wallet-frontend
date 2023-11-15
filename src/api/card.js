import axios from "./axios";


export const createCardRequest = data => axios.post(`/card`,data);
export const getCards = data => axios.get(`/card`,{ params: { dni: data.dni } });
export const deleteCardRequest = data => axios.delete(`/card`,{data: data});
