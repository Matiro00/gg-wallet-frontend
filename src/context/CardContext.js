import { useEffect } from "react";

import { createContext, useContext, useState } from "react";
import { createCardRequest, getCards, deleteCardRequest } from '../api/card';
import { useAuth } from "../context/AuthContext";

const CardContext = createContext();

export const useCard = () => {
    const context = useContext(CardContext);
    if (!context) throw new Error("useCard debe ser usado desde el CardProvider");
    return context;
};

export function CardProvider({ children }) {
    const {checkLogin, user} = useAuth();
    const [response, setResponse] = useState(null);
    const [errors, setErrors] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (errors.length > 0 || response) {
            const timer = setTimeout(() => {
                setErrors([]);
                setResponse(null);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const cleanAlerts = () => {setErrors([]);
        setResponse(null);};
    const addCard = async (data) => {
        try {
            const res = await createCardRequest(data);
            if(res.status ===200){
                setResponse('Tarjeta asociada con exito');
                checkLogin();
            } 
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message);
        }
        
    }
    const showCards = async (data) => {
        try {
            const res = await getCards(data);
            if(res.status ===200){
                setCards(res.data.cards);
            }
            else{
                setCards([])
            }
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message);
        }
        
    }
    const deleteCard = async(data) => {
        try {
            const res = await deleteCardRequest(data);
            setResponse(res.data.message);
            const timer = setTimeout(() => {
                setErrors([]);
                setResponse(null);
            }, 1000);
            return () => clearTimeout(timer);
        } catch (error) {
            console.log(error)
            setErrors(error.response.data.message);
        }
    }
    return (
        <CardContext.Provider
          value={{
            addCard,
            showCards,
            deleteCard,
            cleanAlerts,
            cards,
            response,
            errors
          }}
        >
          {children}
        </CardContext.Provider>
    )
};

