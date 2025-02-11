"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const DEFAULT_CITY = "Tokyo"; // Default city

  // Function to fetch weather
  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      alert("City not found!");
    }
    setLoading(false);
  };

  // Fetch default city weather on component mount
  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, []);

  return (
    <div className="flex justify-center min-h-screen m-auto flex-col max-w-96 gap-8">
      {weather && (
        <div className="mt-12">
          <div className="flex gap-4 justify-center items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="w-12 h-12"
            />
            <h2 className="text-4xl font-bold ">{weather.name}</h2>
          </div>

          <p className="text-center mt-4 text-gray-400 capitalize">
            {weather.weather[0].description}
          </p>
          <div className="mt-8">
            <p className="flex justify-between mb-4">
              🌡️ Temperature : <span>{weather.main.temp}°C</span>
            </p>
            <p className="flex justify-between">
              💨 Wind : <span>{weather.wind.speed} m/s</span>
            </p>
          </div>
        </div>
      )}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">City</span>
        </div>
        <input
          type="text"
          placeholder="Search Weather"
          className="input input-bordered w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <button className="btn btn-outline" onClick={() => fetchWeather(city)}>
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
};

export default WeatherApp;
