import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Details from './pages/Details'; // Página de clima
import ProtectedRoute from './components/ProtectedRoute'; // Proteção de rotas
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protegendo a página de clima */}
          <Route
            path="/details"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
