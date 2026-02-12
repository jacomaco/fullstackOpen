import { useState, useEffect } from 'react'
import Form from './components/Form';
import Display from './components/Display';
import countriesService from './service/countriesService';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    countriesService.getAllCountries().then(allCountries => {
      const names = allCountries.map(country => country.name.common);
      setCountries(names);
      setSearchResults(names);
    });
  }, []);

  useEffect(() => {
    if (searchResults.length === 1) {
      countriesService.getCountry(searchResults[0]).then(country => {
        console.log(country);
        setInfo(country)
      })
    } else {
      setInfo([])
    }
  },[searchResults])
  
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const results = countries.filter(country => country.toLowerCase().includes(newSearchTerm.toLowerCase()));
    setSearchResults(results);
  }

  if (!countries) {
    return null
  }
  return (
    <div>
      <Form value={searchTerm} handleChange={handleSearchChange} />
      <Display searchResults={searchResults} setSearchResults={setSearchResults} info={info}/>
    </div>
  );
}

export default App;