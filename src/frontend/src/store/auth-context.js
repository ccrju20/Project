import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin:  () => {},
    setLogin:  () => {},
    onLogout: () => {},
    register: () => {},
});

export default AuthContext;