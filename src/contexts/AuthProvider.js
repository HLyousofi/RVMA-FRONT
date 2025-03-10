import { createContext, useState } from "react";

export const AuthContext =createContext({
    user : null,
    apiToken : null,
    setUser : () => {},
    setApiToken : () => {}
});

export const AuthProvider = ({ children }) => {
    const [apiToken, _setApiToken] = useState(localStorage.getItem('apiToken'));
    const [user, setUser] = useState({});

    const setApiToken = (token) => {
        _setApiToken(token);
        if(token){
            localStorage.setItem('apiToken',token);
        }else {
            localStorage.removeItem('apiToken')
        }
    }

    return (
        <AuthContext.Provider value={{ user, apiToken, setUser, setApiToken}} >
            {children}
        </AuthContext.Provider>

    )}



