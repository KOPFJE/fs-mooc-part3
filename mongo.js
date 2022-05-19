const mongoose = require('mongoose')
const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name : String,
    number : String
})

const Person = mongoose.model('Person', personSchema)

const createPerson = (newName, newNumber) => {
    const person = new Person({
        name : newName,
        number : newNumber
    })
}