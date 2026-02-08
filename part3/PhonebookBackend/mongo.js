const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("give password, name, number as arguments or just password to list contents of db");
    process.exit(1);
}

// arguments
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const DATABASENAME = 'phonebook';
const USER = 'jacomaco';

// Add and list data dbase content

const URL = `mongodb+srv://${USER}:${password}@fullstack-open-cluster.hythyzw.mongodb.net/${DATABASENAME}?appName=fullstack-open-cluster`;

mongoose.set('strictQuery', false);
mongoose.connect(URL, { family: 4 })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', entrySchema)

// add functionality
if (process.argv.length === 5) {
    const newPerson = new Person({
        name,
        number
    });
    newPerson.save().then((result) => {
        console.log(`added ${name} number ${number} to ${DATABASENAME}`);
        mongoose.connection.close();
    }).catch((err) => console.log('Someting went wrong, could not same entry to database'))
} else if (process.argv.length === 3) {
    Person.find({}).then((result) => {
        console.log('phonebook:');
        result.forEach(entry => {
            console.log(entry.name, entry.number)})
        mongoose.connection.close();
    })
}

