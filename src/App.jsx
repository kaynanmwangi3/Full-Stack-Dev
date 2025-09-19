import './App.css'
import LoginPage from './components/LoginPage.jsx'
import HomePage from './components/HomePage.jsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    
    if (username && userId) {
      setIsAuthenticated(true);
      setUser({ name: username, id: parseInt(userId) });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("username", updatedUser.name);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <LoginPage 
              setIsAuthenticated={setIsAuthenticated}
              setUser={setUser}
            />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <HomePage user={user}  onUserUpdate={handleUserUpdate}/> : 
            <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App