function Forecast({ forecast }) {
    // Filtrer pour avoir une prévision par jour (à midi)
    const dailyForecast = forecast.list.filter(item => 
      item.dt_txt.includes('12:00:00')
    ).slice(0, 5);
  
    return (
      <div className="forecast-container">
        <div className="forecast-header">
          <h3 className="forecast-title">
            <i className="fas fa-calendar-alt"></i>
            Prévisions sur 5 jours
          </h3>
        </div>
        <div className="forecast-grid">
          {dailyForecast.map((day, index) => (
            <div 
              key={index} 
              className="forecast-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="forecast-card-content">
                <div className="forecast-date">
                  <span className="day-name">
                    {new Date(day.dt * 1000).toLocaleDateString('fr-FR', {
                      weekday: 'long'
                    })}
                  </span>
                  <span className="day-number">
                    {new Date(day.dt * 1000).toLocaleDateString('fr-FR', {
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="forecast-icon-wrapper">
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={day.weather[0].description}
                    className="forecast-weather-icon"
                  />
                </div>
                
                <div className="forecast-details">
                  <div className="forecast-temp">
                    <div className="temp-group">
                      <i className="fas fa-temperature-high"></i>
                      <span className="temp-max">{Math.round(day.main.temp_max)}°</span>
                    </div>
                    <div className="temp-group">
                      <i className="fas fa-temperature-low"></i>
                      <span className="temp-min">{Math.round(day.main.temp_min)}°</span>
                    </div>
                  </div>
                  
                  <div className="forecast-info">
                    <div className="info-item">
                      <i className="fas fa-tint"></i>
                      <span>{day.main.humidity}%</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-wind"></i>
                      <span>{Math.round(day.wind.speed * 3.6)} km/h</span>
                    </div>
                  </div>
                  
                  <div className="forecast-desc">
                    {day.weather[0].description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Forecast;