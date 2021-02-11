import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    // Login user, save token to local storage and set token expiration
    const login = useCallback((userId, adminStatus, token, expirationDate) => {
        setIsAdmin(adminStatus);
        setUserId(userId);
        const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpiration);
        localStorage.setItem('userData', JSON.stringify({ userId, adminStatus, token, expiration: tokenExpiration.toISOString() }));
        setToken(token);
    }, []);

    // Log user out and remove information from local storage
    const logout = useCallback(() => {
        setToken(null);
        setIsAdmin(false);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    // Logout automatically after token expires
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const timeRemaining = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, timeRemaining);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    // Relog authenticated user in on page reload
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.adminStatus, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    return { isAdmin, userId, token, login, logout };
};