const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const uri = process.env.MONGODB_URI

console.log('Connecting to', uri);
mongoose.connect(uri, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connectiong to MongDB:', error.message);
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema);