import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import LocationButton from './components/LocationButton';
import { weatherService } from './services/weatherService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnimatedBackground from './components/AnimatedBackground';
import WeatherMap from './components/WeatherMap';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [airQuality, setAirQuality] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [mapCoordinates, setMapCoordinates] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await weatherService.getCurrentWeather(city, 'metric');
      const forecastData = await weatherService.getForecast(city, 'metric');
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError("Une erreur est survenue lors de la recherche");
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationWeather = async (position) => {
    try {
      setLoading(true);
      setError(null);
      const { latitude, longitude } = position.coords;
      const weatherData = await weatherService.getWeatherByLocation(latitude, longitude, 'metric');
      const forecastData = await weatherService.getForecast(weatherData.name, 'metric');
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      setError("Impossible de récupérer la météo pour votre position");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="custom-container py-4">
        <h1 className="text-center mb-4">Météo en Temps Réel</h1>
        <div className="row justify-content-center g-4">
          {/* Search and controls section */}
          <div className="col-12">
            <div className="search-container">
              <div className="d-flex gap-3 flex-grow-1">
                <SearchBar onSearch={handleSearch} />
                <LocationButton onLocation={handleLocationWeather} />
              </div>
            </div>
          </div>

          {loading && <div className="col-12"><div className="alert alert-info">Chargement en cours...</div></div>}
          {error && !loading && <div className="col-12"><div className="alert alert-danger">{error}</div></div>}
          
          {!loading && !error && currentWeather && (
            <>
              {/* Weather info section */}
              <div className="col-md-6">
                <div className="weather-content-container">
                  <WeatherDisplay weather={currentWeather} unit="metric" />
                  {forecast && <Forecast forecast={forecast} />}
                </div>
              </div>
              
              {/* Map section */}
              <div className="col-md-6">
                <div className="weather-map-wrapper">
                  <WeatherMap 
                    lat={currentWeather.coord.lat} 
                    lon={currentWeather.coord.lon} 
                    layers={['temp', 'clouds']}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;