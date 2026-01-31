
const Display = ({ mode, names}) => {
    return (
        <ul>
            {names.map(name => <li key={name}>{name}</li>)}
        </ul>
    )
}

export default Display;