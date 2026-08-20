import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import { useAnecdoteActions } from './store';
import { useEffect } from 'react';
import anecdoteService from './services/anecdoteService';

const App = () => {
  const { initialize } = useAnecdoteActions()

  useEffect(() => { initialize() }, [initialize])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App