import React, { useState, createContext, useContext, useCallback } from 'react';
import GlobalSnackbar from './GlobalSnackbar';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

    const showToast = useCallback((message, severity = 'info') => {
        setToast({ open: true, message, severity });
    }, []);

    const hideToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast((prev) => ({ ...prev, open: false }));
    };

    const value = { showToast };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <GlobalSnackbar
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={hideToast}
            />
        </ToastContext.Provider>
    );
};

export default ToastProvider;
