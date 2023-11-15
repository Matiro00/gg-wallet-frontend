import axios from "./axios";


export const getBenefitsRequest = data => axios.get(`/benefit`,data);
export const getBenefitsRedeemedRequest = data => axios.get(`/benefitRedeemed`,{ params: { dni: data.dni } });
export const exchangeBenefitsRequest = data => axios.put(`/benefit`,data);