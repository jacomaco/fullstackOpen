import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Number = ({ person, onClick }) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={() => onClick(person)}>delete</button>
    </li>
  )
}

const PersonForm = ({
  onSubmit,
  handleNameChange,
  handleNumberchange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input type='text' value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number:{' '}
        <input type='text' value={newNumber} onChange={handleNumberchange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Filter = ({ handleSearchChange, newSearch}) => {
  return (
    <div>
      filter shown with <input type='text' value={newSearch} onChange={handleSearchChange} />
    </div>
  )
}

const Persons = ({ persons, newSearch, onClick }) => {
  return (
    <ul>
      {persons.filter((person) => {
        return person.name.trim().toUpperCase().includes(newSearch.trim().toUpperCase())
      }).map((person) => (
        <Number key={person.id} person={person} onClick={onClick} />
      ))}
    </ul>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messagetype, setMessageType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberchange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearchChange = (e) => {
    setNewSearch(e.target.value)
  }
  const handleDelete = (person) => {
    if (window.confirm(`Delete: ${person.name} ?`)) {
      personService
        .deleteEntrie(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const addName = (e) => {
    e.preventDefault()

    const currentPerson = persons.find((person) => person.name.trim() === newName.trim())
    if (currentPerson !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const newObject = {...currentPerson, number: newNumber}
        personService
          .update(currentPerson.id, newObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== currentPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessageType('success')
            setMessage(`${newName}'s number was updated to ${newNumber}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }).catch(() => {
            setNewName('')
            setNewNumber('')
            setMessageType('error')
            setMessage(`Information of ${currentPerson.name} has already been removed from server`)
            setPersons(persons.filter(person => person.id !== currentPerson.id))
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const newNameObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(newNameObject)
        .then( newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setMessageType('success')
          setMessage(`${newName} was saved!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNewName('')
          setNewNumber('')
          setMessageType('error')
          setMessage(error.response.data.error)
          console.log(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messagetype}/>
      <Filter handleSearchChange={handleSearchChange} newSearch={newSearch}/>
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addName}
        handleNameChange={handleNameChange}
        handleNumberchange={handleNumberchange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} onClick={handleDelete}/>
    </div>
  )
}

export default App
