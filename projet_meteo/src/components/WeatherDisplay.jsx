function WeatherDisplay({ weather }) {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location-info">
          <i className="fas fa-location-dot location-icon"></i>
          <h2 className="city-name">{weather.name}</h2>
        </div>
        <div className="weather-main">
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature-container">
            <div className="temperature-group">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="temp-minmax">
                <div className="temp-item">
                  <i className="fas fa-temperature-high"></i>
                  <span>{Math.round(weather.main.temp_max)}°C</span>
                </div>
                <div className="temp-item">
                  <i className="fas fa-temperature-low"></i>
                  <span>{Math.round(weather.main.temp_min)}°C</span>
                </div>
              </div>
            </div>
            <div className="weather-description">
              <i className="fas fa-cloud weather-desc-icon"></i>
              {weather.weather[0].description}
            </div>
          </div>
        </div>
      </div>
      
      <div className="weather-details-grid">
        <div className="weather-detail-card">
          <i className="fas fa-thermometer-half"></i>
          <div className="detail-content">
            <p>Ressenti</p>
            <strong>{Math.round(weather.main.feels_like)}°C</strong>
          </div>
        </div>
        
        <div className="weather-detail-card">
          <i className="fas fa-tint"></i>
          <div className="detail-content">
            <p>Humidité</p>
            <div className="detail-value">
              <strong>{weather.main.humidity}</strong>
              <span className="unit">%</span>
            </div>
          </div>
        </div>
        
        <div className="weather-detail-card">
          <i className="fas fa-wind"></i>
          <div className="detail-content">
            <p>Vent</p>
            <div className="detail-value">
              <strong>{Math.round(weather.wind.speed * 3.6)}</strong>
              <span className="unit">km/h</span>
            </div>
          </div>
        </div>
        
        <div className="weather-detail-card">
          <i className="fas fa-compress-alt"></i>
          <div className="detail-content">
            <p>Pression</p>
            <div className="detail-value">
              <strong>{weather.main.pressure}</strong>
              <span className="unit">hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;