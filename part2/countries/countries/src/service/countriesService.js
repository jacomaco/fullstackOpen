import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';
const api_key = import.meta.env.VITE_SOME_KEY

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/all`);
    return request.then(response => response.data);
}
const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`);
    return request.then(response => response.data);
}
const getWeather = (city) => {
    const request = axios.get(`api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=${api_key}`)
    return request.then(response => response.data)
}

export default { getAllCountries, getCountry, getWeather }