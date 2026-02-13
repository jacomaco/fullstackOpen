import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then(response => response.data);
}
const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`);
    return request.then(response => response.data);
}
const getWeather = (city, api_key) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=metric`)
    return request.then(response => response.data)
}
 

export default { getAllCountries, getCountry, getWeather }