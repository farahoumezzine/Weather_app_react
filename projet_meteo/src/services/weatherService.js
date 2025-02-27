import axios from "axios";

const API_KEY = "1813084324f0d44c81050f0d28cc0d69";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherService = {
  getCurrentWeather: async (city) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}&lang=fr`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getForecast: async (city) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=fr`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getWeatherByLocation: async (lat, lon) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=fr`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAirQuality: async (lat, lon) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("getAirQuality error:", error.response || error);
      return null; // Return null instead of throwing error for optional data
    }
  },

  getHistoricalWeather: async (city, date, unit = "metric") => {
    try {
      const cityData = await weatherService.getCurrentWeather(city);
      const { lat, lon } = cityData.coord;

      const response = await axios.get(
        `${BASE_URL}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${Math.floor(
          date.getTime() / 1000
        )}&units=${unit}&appid=${API_KEY}&lang=fr`
      );
      return response.data;
    } catch (error) {
      console.error("getHistoricalWeather error:", error.response || error);
      return null; // Return null instead of throwing error for optional data
    }
  },
};
