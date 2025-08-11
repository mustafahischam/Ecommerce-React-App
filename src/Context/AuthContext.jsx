import { useState } from "react";
import { AuthContext } from './AuthContextObject'

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </AuthContext.Provider>
}

export { AuthContext } from './AuthContextObject'
