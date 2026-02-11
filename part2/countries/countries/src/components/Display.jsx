const Display = ({ searchResults, info }) => {
    if (searchResults.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (searchResults.length === 1 && !(Object.keys(info).length === 0)) {
        console.log(typeof info);
        
        return (
            <div>
                <h1>{info.name.common}</h1>
                <p>capital {info.capital?.[0]}</p>
                <p>area {info.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.values(info.languages).map(lang => (
                        <li key={lang}>{lang}</li>
                    ))}
                </ul>
                <img src={info.flags.png} alt={info.flags.alt} />
            </div>
        )
    }
    return (
        <ul>
            {searchResults.map(name => <li key={name}>{name}</li>)}
        </ul>
    )
}

export default Display;