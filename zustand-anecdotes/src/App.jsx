import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import { useAnecdoteActions } from './stores/anecdoteStore';
import { useEffect } from 'react';
import anecdoteService from './services/anecdoteService';
import Notification from './components/Notification';
import { useIsNotificationVisible } from './stores/notificationStore';

const App = () => {
  const { initialize } = useAnecdoteActions()
  useEffect(() => { initialize() }, [initialize])

  return (
    <div>
      {/* add conditional rendering for notification */}
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App