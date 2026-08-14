import { StyledNotification } from './styles/Notification.styled'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <StyledNotification $type={type} className={`notification ${type}`}>
      {message}
    </StyledNotification>
  )
}

export default Notification