import { useAnecdotes, useAnecdoteActions } from '../stores/anecdoteStore'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote, remove } = useAnecdoteActions()

    return (
        <section>
            {anecdotes
                .toSorted((a, b) => (b.votes - a.votes))
                .map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                        {(!anecdote.votes) && <button onClick={() => remove(anecdote.id)}>delete</button>}
                    </div>
                </div>
            ))}
        </section>
    )
}

export default AnecdoteList