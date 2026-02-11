const Display = ({ searchResults, }) => {
    if (searchResults.length === 1) {
        return <p>Country</p>;
    }
    return (
        <ul>
            {searchResults.map(name => <li key={name}>{name}</li>)}
        </ul>
    )

}

export default Display;