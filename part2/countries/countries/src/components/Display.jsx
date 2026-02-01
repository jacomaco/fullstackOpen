
const Display = ({ names, searchTerm}) => {
    const filteredNames = names.filter(name => name.toLowerCase().trim().includes(searchTerm.trim().toLowerCase()))
    if (filteredNames.length !== 1) {
        return (
        <ul>
            {names.map(name => <li key={name}>{name}</li>)}
        </ul>
        )
    }
    
    
}

export default Display;