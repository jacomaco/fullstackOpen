import { useState, useEffect } from 'react'
import Form from './components/Form';
import Display from './components/Display';
import countriesService from './service/countriesService';
function App() {
  const [searchTerm, setSeachTerm] = useState("");
  const [displayDetailedMode, setDetaildDisplayMode] = useState(false)
  const [searchResults, setSearchResults] = useState();
  const [names, setNames] = useState([])

  useEffect(() => {
    // get all names
    countriesService.getAllCountrieNames()
      .then(response => {
        setNames(response.map(response => response.name.common))
        console.log(response.map(response => response.name.common)); // remove this line later
        }
      )
  },[]) 

  useEffect(() => {
    if(searchResults && searchResults.length === 1) {
      // make api call to fetch relevant info about country
      console.log("deach");
      
    }
  },[searchTerm])

  const handleChange = (event) => {
    console.log(`value in ${searchTerm}`);
    setSeachTerm(event.target.value)
  }
  
  return (
    <>
    <Form value={searchTerm} handleChange={handleChange}/>
    <Display mode={displayDetailedMode} names={names}/>
    </>
  )
}

export default App
