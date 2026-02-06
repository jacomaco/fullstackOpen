const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')

const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));

let persons = [
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

// 3.4
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
})

// 3.5
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } 
  if (persons.find(person => person.number === body.number)) {
    return response.status(400).json({
      error: "number must not already be assigned to another person"
    })
  }

  const entry = {
    id: getRandomID(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(entry);
  response.status(201).json(entry);
})

function getRandomID() {
  return Math.floor(Math.random() * 1000000).toString();
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})