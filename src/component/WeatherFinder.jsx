import React from "react";
import { useState } from "react";
import axios from "axios";

function WeatherFinder() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=273cc29050746af76aecb170d30bdcbd&units=metric`
      )
      .then((res) => {
        setWeather(res.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError(`Error: ${err.message}`);
      });
  };

  return (
    <>
      <div className="App">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Get</button>
        {error ? (
          <p>{error}</p>
        ) : (
          weather.name && (
            <div>
              <h2>Weather in {weather.name}</h2>
              <p>Temperature: {weather.main && weather.main.temp} °C</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default WeatherFinder;
