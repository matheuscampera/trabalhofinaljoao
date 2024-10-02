import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const Home = () => {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        color: 'white',
        fontFamily: 'Orbitron',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Unilavras Clima
      </Typography>
      <TextField
        variant="outlined"
        label="Digite o nome da cidade"
        value={city}
        onChange={handleInputChange}
        style={{ background: 'white', borderRadius: 8, width: '300px', marginBottom: '20px' }}
      />
      <Link to={`/details/${city}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="secondary" size="large">
          Ver Clima
        </Button>
      </Link>
    </Box>
  );
};

export default Home;
