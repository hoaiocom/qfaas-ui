import React, { useState } from 'react';

export const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token; // return true or false

    //if user have token => enable
    //if user does not have token => disable
    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}