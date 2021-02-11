import { createContext } from 'react';

// Authorization data for the entire app

export const AuthContext = createContext({
    isLoggedIn: false,
    isAdmin: true,
    userId: null,
    token: null,
    login: () => { },
    logout: () => { }
});