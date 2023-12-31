import './App.css';

import { Sidebar } from 'flowbite-react';

import { AuthProvider, useAuth } from './modules/shared/hooks/Auth';
import AuthRoutes from './modules/public/routes';
import AppRoutes from './modules/admin/routes';
import { useEffect } from 'react';
import SharedRoutes from './modules/shared/routes';
import { ToastProvider } from './modules/shared/hooks/toast';


function App() {
  
  return (
    <ToastProvider>
      <AuthProvider>
        <SharedRoutes />
      </AuthProvider>
    </ToastProvider>
  );
}


export default App;
