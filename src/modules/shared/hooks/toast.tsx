import { Toast } from 'flowbite-react';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 } from 'uuid';

interface ToastContextData {
    addToast(toast: Omit<ToastMessage, 'id'>): void;
}

export interface ToastMessage {
    description: string;
    color: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider = ({children}: any) => {
    
    const[toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback(({description, color}: ToastMessage)=>{
        const toast = {
            description,
            color,
        }

        setToasts(state => [...state, toast]);

    }, []);

    return (
        <ToastContext.Provider value={{addToast}} >
            {children}  
            <div className="fixed top-0 right-0 p-3">
                {toasts.map((toast) => (
                    <Toast className={`bg-${toast.color}-500 space-x-4 mb-4`}>
                        <div className="ml-3 text-sm font-normal text-white">{toast.description}</div>
                        <Toast.Toggle />
                    </Toast>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if(!context){
        throw new Error('useToast must be within a ToastContextProvider');
    }

    return context;
}

