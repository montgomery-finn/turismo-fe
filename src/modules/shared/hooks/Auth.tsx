import React, { createContext, useCallback, useState, useContext, PropsWithChildren } from 'react';
import SpringApi from '../services/SpringApi';
import LoginDTO from '../../public/DTOs/LoginDTO';

interface User {
    id: string;
    nome: string;
    email: string;
    tipo: 'agencia' | 'cliente';
}

interface AuthState {
    token: string;
    user: User;
}

interface LogInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    logIn(credentials: LogInCredentials): Promise<void>;
    logOut(): void;
    updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: any) => {
    
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@turismo:token');
        const user = localStorage.getItem('@turismo:user');

        if(token && user){
            SpringApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return {token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const logIn = useCallback(async ({email, password}: any) => {
        
        const response = await SpringApi.post<LoginDTO>('/auth', {
            username: email,
            password: password
        })

        const { token, user } = response.data;

        localStorage.setItem('@turismo:token', token);
        localStorage.setItem('@turismo:user', JSON.stringify(user));

        SpringApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setData({token, user});
        
    }, []);

    const logOut = useCallback(() => {
        localStorage.removeItem('@turismo:token');
        localStorage.removeItem('@turismo:user');

        setData({} as AuthState);
    }, []);

    const updateUser = useCallback((user: User) => {
        localStorage.setItem('@turismo:user', JSON.stringify(user));
        
        setData({
            token: data.token,
            user
        });
    }, [data.token]);
    
    return (
        <AuthContext.Provider value={{user: data.user, logIn, logOut, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
}