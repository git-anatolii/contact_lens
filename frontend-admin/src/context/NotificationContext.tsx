"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Toast from '@/components/common/Toast';

interface NotificationContextProps {
    setSuccessMessage: (message: string) => void;
    setErrorMessage: (message: any) => void;
    clearMessages: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const setSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(clearMessages, 5000); // Clear messages after 3 seconds
    };

    const setError = (message: any) => {
        setErrorMessage(message);
        setTimeout(clearMessages, 5000); // Clear messages after 3 seconds
    };

    const clearMessages = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    return (
        <NotificationContext.Provider value={{ setSuccessMessage: setSuccess, setErrorMessage: setError, clearMessages }}>
            {children}
            <Toast error={errorMessage || undefined} success={successMessage || undefined} clearMessages={clearMessages} />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
