import { useIsNotificationVisible, useNotificationMessage } from '../stores/notificationStore';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  const visible = useIsNotificationVisible()
  const message = useNotificationMessage()

  return (
    <>
      {visible && <div style={style}>{message}</div> }
    </>
  )
}

export default Notification