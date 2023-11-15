import { useEffect } from "react";

import { createContext, useContext, useState } from "react";
import {transferRequest} from '../api/transfer';
import { useAuth } from "../context/AuthContext";

const TransferContext = createContext();

export const useTransfer = () => {
    const context = useContext(TransferContext);
    if (!context) throw new Error("useTransfer debe ser usado desde el TransferProvider");
    return context;
};

export function TransferProvider({ children }) {
    const {checkLogin} = useAuth();
    const [response, setResponse] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (errors.length > 0 || response) {
            const timer = setTimeout(() => {
                setErrors([]);
                setResponse(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);


    const doTransfer = async (data) => {
        try {
            const res = await transferRequest(data);
            if(res.status ===200){
                setResponse(res.data.message);
                checkLogin();
                console.log(res);
            } 
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message);
        }
        
    }
    return (
        <TransferContext.Provider
          value={{
            doTransfer,
            response,
            errors
          }}
        >
          {children}
        </TransferContext.Provider>
    )
};

