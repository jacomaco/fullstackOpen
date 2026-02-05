const express = require('express');
const app = express();

app.use(express.json());

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// 3.1
app.get('/api/persons', (request, response) => response.json(persons));

// 3.3
app.get('/api/persons/:id', (request, response) => {
  // find base of id
  const id = request.params.id;
  const person = persons.find(person => person.id === id);

  if(!person) {
    return response.status(404).end();
  }
  response.json(person);
})

// 3.2
app.get('/info', (request, response) => {
    const numberOfPeople = persons.length;
    const currentTime = new Date();
    response.send(`
        <p>Phonebook has info for ${numberOfPeople} people</p>
        <p>${currentTime}</p>
    `)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})