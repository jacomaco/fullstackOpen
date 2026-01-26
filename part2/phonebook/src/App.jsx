import { useState } from "react";

const Number = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

const Form = ({
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Artho Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberchange = (e) => {
    setNewNumber(e.target.value);
  };

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
      };
      setPersons(persons.concat(newNameObject));
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        onSubmit={addName}
        handleNameChange={handleNameChange}
        handleNumberchange={handleNumberchange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Number
            key={person.name}
            name={person.name}
            number={person.number}
            newName={newName}
            newNumber={newNumber}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
