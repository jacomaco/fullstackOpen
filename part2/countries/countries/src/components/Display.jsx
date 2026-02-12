const Display = ({ searchResults, setSearchResults, info }) => {

    const handleButtonPress = (name) => () => {
        console.log(name);

        setSearchResults([name])
    }
    if (searchResults.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (searchResults.length === 1 && Object.keys(info).length > 0) {
        const { name, capital, area, languages, flags } = info
        return (
            <div>
                <h1>{name.common}</h1>
                <p>capital {capital?.[0]}</p>
                <p>area {area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(languages).map(lang => (
                        <li key={lang}>{lang}</li>
                    ))}
                </ul>
                <img src={flags.png} alt={flags.alt} />
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