import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TasksProvider } from './context/TasksContext';
import App from './App.tsx'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import './index.css'


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? <>{children}</> : <Navigate to="/" />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <App />
                  </ProtectedRoute>
                }
              /> {/* Task tracker main app */}
          </Routes>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
    
  </StrictMode>,
)
