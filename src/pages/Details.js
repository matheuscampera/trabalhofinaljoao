import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, Paper, Button, TextField, Grid } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Details = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState(''); // Armazena o nome da cidade digitada pelo usuário
  const [weatherData, setWeatherData] = useState(null);
  const [cityInfo, setCityInfo] = useState(null); // Para armazenar as informações da cidade
  const [loading, setLoading] = useState(false);  // Indica se está carregando os dados
  
  const apiKey = '7f855ec225c512cd538190d0fd5c3e81';  // OpenWeatherMap API Key
  const geoDbApiKey = '58467c3dd8msh6e4ce41314b6f39p1e449fjsn4a5f5f907ece';  // GeoDB API Key

  const handleSearchCity = async () => {
    if (!city) {
      alert('Por favor, insira o nome de uma cidade.');
      return;
    }

    setLoading(true); // Inicia o carregamento dos dados

    try {
      // Busca o clima da cidade
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      // Busca informações sobre a cidade da API GeoDB Cities
      const cityInfoResponse = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=BR&namePrefix=${city}&limit=1`,
        {
          headers: {
            'X-RapidAPI-Key': geoDbApiKey,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          },
        }
      );

      if (cityInfoResponse.data.data.length > 0) {
        setCityInfo(cityInfoResponse.data.data[0]); // Pega a primeira cidade da lista
      } else {
        setCityInfo(null); // Se não encontrar a cidade
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Erro ao buscar a cidade. Verifique o nome da cidade e tente novamente.');
    } finally {
      setLoading(false); // Encerra o carregamento dos dados
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="2rem"
      style={{
        background: 'linear-gradient(135deg, #0d47a1 0%, #1a237e 100%)',
        color: 'white',
        fontFamily: 'Orbitron',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Buscar Clima
      </Typography>

      <Box mb={4} width="100%" display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          label="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          style={{
            maxWidth: '400px',
            backgroundColor: 'white',  // Cor de fundo clara
            borderRadius: '4px',  // Bordas arredondadas
          }}
          InputProps={{
            style: {
              color: '#1a237e',  // Cor do texto (azul escuro, por exemplo)
            },
          }}
          InputLabelProps={{
            style: {
              color: '#1a237e',  // Cor do placeholder (azul escuro, por exemplo)
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchCity}
          style={{ marginLeft: '10px' }}
        >
          Buscar
        </Button>
      </Box>

      {loading && <CircularProgress color="inherit" />}

      {weatherData && cityInfo && !loading && (
        <Grid container spacing={3} justifyContent="center" style={{ width: '100%' }}>
          {/* Bloco de informações do clima */}
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              style={{
                padding: '20px',
                backgroundColor: '#303f9f',
                color: 'white',
                borderRadius: '10px',
                textAlign: 'center',
                height: '250px',  // Definindo altura fixa
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5">Condições Meteorológicas</Typography>
              <Typography variant="h6">Temperatura: {weatherData.main.temp}°C</Typography>
              <Typography variant="h6">Condições: {weatherData.weather[0].description}</Typography>
              <Typography variant="h6">Humidade: {weatherData.main.humidity}%</Typography>
            </Paper>
          </Grid>

          {/* Bloco de informações sobre a cidade */}
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={3}
              style={{
                padding: '20px',
                backgroundColor: '#303f9f',
                color: 'white',
                borderRadius: '10px',
                textAlign: 'center',
                height: '250px',  // Definindo altura fixa
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5">Informações da Cidade</Typography>
              <Typography variant="h6">População: {cityInfo.population.toLocaleString()}</Typography>
              <Typography variant="h6">País: {cityInfo.country}</Typography>
              <Typography variant="h6">Latitude: {cityInfo.latitude}</Typography>
              <Typography variant="h6">Longitude: {cityInfo.longitude}</Typography>
            </Paper>
          </Grid>

          {/* Exibindo o mapa */}
          <Grid item xs={12}>
            <MapContainer
              center={[cityInfo.latitude, cityInfo.longitude]}
              zoom={10}
              style={{ height: '400px', width: '100%', marginTop: '20px', borderRadius: '10px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[cityInfo.latitude, cityInfo.longitude]}>
                <Popup>
                  {cityInfo.city}, {cityInfo.country}
                </Popup>
              </Marker>
            </MapContainer>
          </Grid>
        </Grid>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        style={{ marginTop: '30px', padding: '10px 20px', fontSize: '16px', borderRadius: '8px' }}
      >
        Voltar ao Menu Principal
      </Button>
    </Box>
  );
};

export default Details;
