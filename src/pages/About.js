import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
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
        Sobre o Unilavras Clima
      </Typography>
      <Typography variant="body1" style={{ maxWidth: '500px', textAlign: 'center' }}>
        O Unilavras Clima é um aplicativo avançado de previsão do tempo, projetado para fornecer informações precisas e em tempo real sobre as condições meteorológicas em qualquer cidade.
      </Typography>
    </Box>
  );
};

export default About;
