import axios from "axios";
import React, { useState, useEffect } from "react";
import Country from "./Components/Country";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState({});
  const [filterCountries, setFilterCountries] = useState([]);
  const [country, setCountry] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const searchInput = (e) => {
    const name = e.target.value;
    setSearch(name);
    const matchingCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilterCountries(matchingCountries);
    if (matchingCountries.length === 1) {
      setCountry(matchingCountries[0]);
    }
  };

  const showCountry = (name) => {
    setCountry(countries.filter((country) => country.name === name));
  };

  if (countries.length !== 0) {
    return (
      <div>
        <form>
          <label>find countries</label>
          <input value={search} onChange={searchInput} />
        </form>
        {filterCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filterCountries.length === 1 ? (
          <Country country={country} />
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
  } else {
    return null;
  }
};

export default App;
