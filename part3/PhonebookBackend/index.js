require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');


morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')

const app = express();
app.use(express.static('dist'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'));

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// 3.1
app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
});

// 3.3
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findById(id).then(person => {
    response.json(person);
  }).catch(err => {
    response.status(404).end();
  })
})

// 3.2
app.get('/info', (request, response) => {
    const currentTime = new Date();
    Person.countDocuments({}).then(numberOfPeople => {
      response.send(`
        <p>Phonebook has info for ${numberOfPeople} people</p>
        <p>${currentTime}</p>
      `)
    })
})

// 3.4
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => {
      console.log(error);
      response.status(400).send({
        error: 'malformatted id'
      })
    })
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

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })
  newPerson.save().then(result => {
    response.status(201).json(result);
  })
})

function getRandomID() {
  return Math.floor(Math.random() * 1000000).toString();
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})