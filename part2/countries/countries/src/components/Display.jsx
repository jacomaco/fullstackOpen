const Display = ({ searchResults, info }) => {
    if (searchResults.length === 1 && info && info.name) {
        console.log(info);
        
        return (
            <div>
                <h1>{info.name.common}</h1>
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