require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : '',
)

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :body'),
)

// 3.1
app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person)
  })
})

// 3.3
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        return response.json(person)
      }
      response.status(404).end()
    })
    .catch((error) => next(error))
})

// 3.2
app.get('/info', (request, response) => {
  const currentTime = new Date()
  Person.countDocuments({}).then((numberOfPeople) => {
    response.send(`
        <p>Phonebook has info for ${numberOfPeople} people</p>
        <p>${currentTime}</p>
      `)
  })
})

// 3.4
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

// 3.5
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: 'name or number missing'
  //   })
  // }
  // if (persons.find(person => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }
  // if (persons.find(person => person.number === body.number)) {
  //   return response.status(400).json({
  //     error: 'number must not already be assigned to another person'
  //   })
  // }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).send({ error: 'note does not exist' })
      }
      person.name = name
      person.number = number

      return person.save().then((updatedEntry) => {
        response.json(updatedEntry)
      })
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.name)
  console.log('---')
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
