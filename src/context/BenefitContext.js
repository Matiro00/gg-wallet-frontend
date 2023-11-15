import { useEffect } from "react";

import { createContext, useContext, useState } from "react";
import {exchangeBenefitsRequest, getBenefitsRedeemedRequest} from '../api/benefits';
import { useAuth } from "../context/AuthContext";
import {getBenefitsRequest} from '../api/benefits';

const BenefitContext = createContext();

export const useBenefit = () => {
    const context = useContext(BenefitContext);
    if (!context) throw new Error("useBenefit debe ser usado desde el BenefitProvider");
    return context;
};

export function BenefitProvider({ children }) {
    const {checkLogin} = useAuth();
    const [response, setResponse] = useState(null);
    const [errors, setErrors] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [benefitsRedeemed, setBenefitsRedeemed] = useState([]);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
                setResponse(null);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const getBenefitsRedeemed = async (data) => {
        try {
            const res = await getBenefitsRedeemedRequest(data);
            if(res.status ===200){
            setBenefitsRedeemed(res.data.benefitsList);
            }
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message);
        }
        
    }
    const getBenefits = async (data) => {
        try {
            const res = await getBenefitsRequest(data);
            console.log(res)
            if(res.status ===200){
                setBenefits(res.data.benefitsList);
            }
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message);
        }
        
    }
    const exchangeBenefits = async (data) => {
        try {
            const res = await exchangeBenefitsRequest(data);
            checkLogin();
            setResponse(res.data.message);
        } catch (error) {
            console.log(error)
            setResponse(null);
            setErrors(error.response.data.message);
        }
        
    }

    return (
        <BenefitContext.Provider
          value={{
            exchangeBenefits,
            getBenefits,
            getBenefitsRedeemed,
            benefitsRedeemed,
            benefits,
            response,
            errors
          }}
        >
          {children}
        </BenefitContext.Provider>
    )
};

