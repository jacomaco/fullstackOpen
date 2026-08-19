import anecdoteService from '../services/anecdoteService'
import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        const newAnecdote = await anecdoteService.createNew(content)
        add(newAnecdote)
        e.target.reset()
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={ addAnecdote }>
            <div>
                <input type="text" name="anecdote" />
            </div>
            <button type='submit'>create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm