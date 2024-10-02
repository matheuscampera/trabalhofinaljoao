import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rotas que requerem autenticação
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Se o usuário estiver autenticado, renderiza o componente filho
  return children;
};

export default ProtectedRoute;
