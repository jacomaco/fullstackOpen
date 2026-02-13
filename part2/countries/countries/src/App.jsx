import { useState, useEffect } from 'react'
import Form from './components/Form';
import Display from './components/Display';
import countriesService from './service/countriesService';
const api_key = import.meta.env.VITE_SOME_KEY

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [info, setInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(() => {
    countriesService.getAllCountries().then(allCountries => {
      const names = allCountries.map(country => country.name.common);
      setCountries(names);
      setSearchResults(names);
    });
  }, []);

  useEffect(() => {
    if (searchResults.length === 1) {
      countriesService.getCountry(searchResults[0])
        .then(country => {
          setInfo(country);
          return countriesService.getWeather(country.capital[0], api_key);
        })
        .then(weather => {
          setWeatherInfo(weather);
        })
        .catch(err => console.log(err));
    } else {
      setInfo(null);
      setWeatherInfo(null);
    }
  }, [searchResults]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = countries.filter(country => country.toLowerCase().includes(term.toLowerCase()));
    setSearchResults(filtered);
  }

  if (!countries) return <div>Loading data...</div>

  return (
    <div>
      <Form value={searchTerm} handleChange={handleSearchChange} />
      <Display
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        info={info || {}}
        weather={weatherInfo} />
    </div>
  );
}

export default App;