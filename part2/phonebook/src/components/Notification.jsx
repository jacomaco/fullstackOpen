const Notification = ({ message, type="success" }) => {
    if (message === null) {
        return null
    }

    if (type === "error") {
        return (
            <div className="errorMessage">
                {message}
            </div>
        )
    } else if (type === "success") {
         return (
        <div className="added">
            {message}
        </div>
    )
    }
}
export default Notification;