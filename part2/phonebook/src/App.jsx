import { useState } from "react";

const Number = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

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
        name: <input type="text" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number:{" "}
        <input type="text" value={newNumber} onChange={handleNumberchange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ handleSearchChange, newSearch}) => {
  return (
    <div>
      filter shown with <input type="text" value={newSearch} onChange={handleSearchChange} />
    </div>
  );
};

const Persons = ({ persons, newSearch }) => {
  return (
    <ul>
      {persons.filter((person) => {
        return person.name.trim().toUpperCase().includes(newSearch.trim().toUpperCase())
      }).map((person) => (
        <Number key={person.id} name={person.name} number={person.number} />
      ))}
    </ul>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Artho Hellas", number: "040-1234567", id: 1},
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberchange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  }

  const addName = (e) => {
    e.preventDefault();

    if (
      persons.find((person) => person.name.trim() === newName.trim()) !==
      undefined
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newNameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(newNameObject));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;
