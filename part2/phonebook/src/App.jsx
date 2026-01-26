import { useState } from "react";

const Number = ({ name }) => {
  return <li>{name}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Artho Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();
    console.log(newName);
    console.log(persons);
    
    if (persons.find((person) => person.name.trim() === newName.trim()) !== undefined) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newNameObject = {
        name: newName,
      };
      setPersons(persons.concat(newNameObject));
    }
    setNewName('')
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Number key={person.name} name={person.name} />
        ))}
      </ul>
    </div>
  );
};

export default App;
