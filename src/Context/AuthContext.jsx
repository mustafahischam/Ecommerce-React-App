import { useState } from "react";
import { AuthContext } from './AuthContextObject'
import { getUserDataApi } from "../Services/authServices";
import { useEffect } from "react";
export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
    const [userData, setUserData] = useState(null)
    async function getLoggedUserData() {
        const response = await getUserDataApi()
        if (response.message) {
            setUserData(response.user)
        }
    }
    useEffect(() => {
        if (isLoggedIn) {
            getLoggedUserData()
        }
    }, [isLoggedIn])
    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
        {children}
    </AuthContext.Provider>
}

export { AuthContext } from './AuthContextObject'
