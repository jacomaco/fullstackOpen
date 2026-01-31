
const Form = ({ value, handleChange}) => {
    return (
        <form >
            find countries <input type="text" value={value} onChange={handleChange}/>
        </form>
    )
}

export default Form