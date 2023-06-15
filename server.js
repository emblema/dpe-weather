import express from 'express';
import path from 'path';
import fs from 'fs';
import axios from 'axios';

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/weather', async (req, res) => {
  const { location } = req.body;
  if (!location) {
    res.status(400).send('Location is required');
  }

  try {
    const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

    if (!openWeatherApiKey) {
      throw new Error('Open Weather API key is missing');
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openWeatherApiKey}`;
    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      throw new Error('Invalid response from server');
    }

    const weatherData = response.data;
    res.send({
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      weatherCondition: weatherData.weather[0].main,
      coord: weatherData.coord,
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
    console.log(error);
  }
});

app.get('/map', (req, res) => {
  try {
    const filePath = path.join(__dirname, './public/index.html');
    let html = fs.readFileSync(filePath, 'utf8');

    const googleMapsApiKey = process.env.GOOGLEMAPS_API_KEY;
    if (!googleMapsApiKey) {
      throw new Error('Google Maps API key is missing');
    }

    html = html.replace('GOOGLEMAPS_API_KEY', googleMapsApiKey);
    res.send(html);
  } catch (error) {
    res.status(500).send('Internal Server Error');
    console.log(error);
  }
});

export default app;
