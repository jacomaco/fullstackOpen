const Display = ({ searchResults, setSearchResults, info, weather }) => {
    const handleButtonPress = (name) => () => {setSearchResults([name])}
    if (searchResults.length > 10) return <div>Too many matches, specify another filter</div>

    if (searchResults.length === 1 && Object.keys(info).length > 0) {
        const { name, capital, area, languages, flags } = info
        return (
            <div>
                <h1>{name.common}</h1>
                <p>Capital {capital?.[0]}</p>
                <p>Area {area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(languages).map(lang => (
                        <li key={lang}>{lang}</li>
                    ))}
                </ul>
                <img src={flags.png} alt={flags.alt} />

                {weather ? (
                    <div>
                        <h2>Weather in {info.capital?.[0]}</h2>
                        <p>Temperature {Math.trunc((weather.main.temp) * 100) / 100} Celsius</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <p>Wind {weather.wind.speed} m/s</p>
                    </div>
                ) : (
                    <p>Loading weather...</p>
                )}
            </div>
        )
    }
    return (
        <ul style={{ listStyle: 'none', padding: '0' }}>
            {searchResults.map((name) => (
                <li key={name} style={{ marginBottom: '5px' }}>
                    {name} <button onClick={handleButtonPress(name)}>show</button>
                </li>
            ))}
        </ul>
    )
}

export default Display;