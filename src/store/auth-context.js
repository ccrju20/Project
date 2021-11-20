import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    isSignedUp: false,
    onLogout: () => {}
});

export default AuthContext;