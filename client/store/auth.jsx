// import {useContext, createContext } from "react";
// import { useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//     const [token, setToken] = useState(localStorage.getItem("token") || null);

//     const storetokenInLS = (serverToken) => {
//         setToken(serverToken);
//         localStorage.setItem("token", serverToken);
//     }

//     let isLoggedIn = !!token;

//     //for logout function
//     const LogoutUser = () => {
//         setToken("");
//         return localStorage.removeItem("token");
//     }

//     return <AuthContext.Provider value={{isLoggedIn,storetokenInLS,LogoutUser}}>
//         {children}
//     </AuthContext.Provider>;
// }

// export const useAuth = () =>{
//     const authContextValue= useContext(AuthContext);
//     if(!authContextValue){
//         throw new Error("useAuth must be used within AuthProvider");
//     }
//     return authContextValue;
// }


import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const storetokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;

    // Logout function
    const LogoutUser = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
    }

    // JWT Authentication - get currently logged in user data
    const userAuthentication = async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("User data:", data.userData);
                setUser(data.userData);
            } else {
                console.log("Error fetching user data");
                LogoutUser(); // Clear invalid token
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]);

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            storetokenInLS, 
            LogoutUser, 
            user, 
            token,
            isLoading 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return authContextValue;
}