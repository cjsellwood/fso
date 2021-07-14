import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, []);

  if (weather.main) {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img width="300px" src={country.flag} alt={country.name + " flag"} />
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather.main.temp - 273.15}</p>
        <p>Description: {weather.weather[0].description}</p>
        <p>
          Wind: {weather.wind.speed} m/s {weather.wind.deg} °
        </p>
      </div>
    );
  } else {
    return null;
  }
};

export default Country;
