import { useIsNotificationVisible} from '../stores/notificationStore';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
  const visible = useIsNotificationVisible()

  return (
    <>
    { visible && <div style={style}>render here notification...</div> }
    </>
  )
}

export default Notification