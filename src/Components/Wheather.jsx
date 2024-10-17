import React, { useState } from 'react';
import "../Style.css"

const Wheather = () => {
  let api = {
    key: "149d59d9421505cfa66a39abf27c3753",
    url: "https://api.openweathermap.org/data/2.5/weather",
  };

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function change() {
    setLoading(true);
    setError(""); // Clear any previous errors
    fetch(`${api.url}?q=${search}&appid=${api.key}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") {
          setError("City not found");
        } else {
          setWeather(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred");
        setLoading(false);
      });
  }

  function enter(e) {
    if (e.key === "Enter") {
      change();
    }
  }

  return (
    <div className="app">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={enter}
        />
        <button className="search-button" onClick={change}>
          Search
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : weather.main ? (
        <div className="weather-info">
          <h3 className="city-name">{weather.name}</h3>
          <p className="temperature">{Math.round(weather.main.temp - 273.15)}°C</p>
          {/* <p className="description">{weather.weather[0].description}</p> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Wheather;