import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Recupera os usuários registrados no localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário existe e se a senha está correta
    const user = existingUsers.find(user => user.email === email && user.password === password);

    if (user) {
      // Usuário autenticado com sucesso
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/details');  // Redireciona para a página de clima
    } else {
      alert('Email ou senha inválidos!');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      className="auth-page"
    >
      <Paper className="auth-card" elevation={5}>
        <Typography variant="h4" gutterBottom className="centered heading-lg">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            variant="outlined"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="auth-button"
            style={{ marginTop: '20px' }}
          >
            Entrar
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
