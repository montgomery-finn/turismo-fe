import './App.css';

import { Sidebar } from 'flowbite-react';

import { AuthProvider, useAuth } from './modules/shared/hooks/Auth';
import AuthRoutes from './modules/auth/routes';
import AppRoutes from './modules/app/routes';
import { useEffect } from 'react';
import SharedRoutes from './modules/shared/routes';


function App() {
  
  return (
    <AuthProvider>
      <SharedRoutes />
    </AuthProvider>
  );
}


export default App;
