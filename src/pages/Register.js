import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Recupera os usuários já cadastrados no localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o email já está cadastrado
    const userExists = existingUsers.find(user => user.email === email);

    if (userExists) {
      alert('Esse email já está registrado. Tente fazer login.');
    } else {
      // Adiciona o novo usuário ao localStorage
      const newUser = { email, password };
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      alert('Usuário registrado com sucesso!');

      // Redireciona para o login após o registro bem-sucedido
      navigate('/');
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
          Registrar
        </Typography>
        <form onSubmit={handleRegister}>
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
            Registrar
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Já tem uma conta? <Link to="/">Faça login</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
