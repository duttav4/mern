import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [auth, setAuth] = useState({
        user:null,
        token:""
    })

    /* token added in axios default headers request */
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if(data){
            const pasreData = JSON.parse(data)
            setAuth({
                ...auth,
                user:pasreData.user,
                token:pasreData.token
            })
        }
        // eslint-disable-next-line
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }