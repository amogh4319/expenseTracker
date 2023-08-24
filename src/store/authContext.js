import React, { useState } from 'react';
 const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    emailVerified:false,
    logIn:(token)=>{},
    logOut:()=>{},
    setEmailVerified:(value)=>{}
 });


 export function AuthContextProvider(props) {
    const [token, setToken] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    let userLoggedIn = !!token;
    const loginHandler = (token) => {
        setToken(token);
    };
    const logoutHandler = () => {
        setToken(null);
        setEmailVerified(false);
    };
    function setEmailVerify(value) {
         setEmailVerified(value);
     }

    const authContext = {
        token: token,
        isLoggedIn: userLoggedIn,
        emailVerified:emailVerified,
        logIn: loginHandler,
        logOut: logoutHandler,
        setEmailVerified: setEmailVerify 
    };
    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
}
 export default AuthContext;