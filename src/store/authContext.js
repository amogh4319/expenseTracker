import React, { useState } from 'react';
 const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    logIn:(token)=>{},
    logOut:()=>{}
 });


 export function AuthContextProvider(props) {
    const [token, setToken] = useState('');
    let userLoggedIn = !!token;
    const loginHandler = (token) => {
        setToken(token);
    };
    const logoutHandler = () => {
        setToken(null);
    };

    const authContext = {
        token: token,
        isLoggedIn: userLoggedIn,
        logIn: loginHandler,
        logOut: logoutHandler
    };
    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
}
 export default AuthContext;