import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState({});
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const searchInput = (e) => {
    setSearch(e.target.value);
    setFilterCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const showCountry = (name) => {
    setFilterCountries(countries.filter((country) => country.name === name));
  };

  return (
    <div>
      <form>
        <label>find countries</label>
        <input value={search} onChange={searchInput} />
      </form>
      {filterCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filterCountries.length === 1 ? (
        <div>
          <h1>{filterCountries[0].name}</h1>
          <p>capital {filterCountries[0].capital}</p>
          <p>population {filterCountries[0].population}</p>
          <h2>Languages</h2>
          <ul>
            {filterCountries[0].languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img
            width="300px"
            src={filterCountries[0].flag}
            alt={filterCountries[0].name + " flag"}
          />
        </div>
      ) : (
        <ul>
          {filterCountries.map((country) => (
            <li key={country.name}>
              {country.name}
              <button onClick={() => showCountry(country.name)}>show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
