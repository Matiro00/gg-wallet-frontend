
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { registerRequest, verifyTokenRequest, loginRequest,verificationCodeRequest } from "../api/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [errors]);
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data.user);
            setIsAuthenticated(false);
        } catch (error) {
            setErrors(error.response.data.message);
        }
    };

    const login = async (username, password) => {
        try {
            const res = await loginRequest({username: username, password: password});
            if(res.status ===200){
                setUser(res.data);
                setIsAuthenticated(true);
                checkLogin();
            }
            else if(res.status === 202){
                setUser(res.data.user);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    };
    const verificationCode = async (dni, code) => {
        try {
            const res = await verificationCodeRequest({dni:dni, code:code});
            if (res.status === 200) {
                setIsAuthenticated(true);
                checkLogin();
            }
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    };
    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };
    const checkLogin = async () => {
        const cookies = Cookies.get();
        if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }
        
        try {
            const res = await verifyTokenRequest(cookies.token);
            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setIsAuthenticated(false);
            setLoading(false);
        }
    };
    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                login,
                logout,
                verificationCode,
                checkLogin,
                isAuthenticated,
                errors,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>);
}