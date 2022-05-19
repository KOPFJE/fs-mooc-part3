require('dotenv').config()
const express = require('express');
const cors = require('cors');

const Person = require('./models/person');
const { response } = require('express');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
});

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.content === undefined) {return res.status(400).json({ error: 'content missing'})}

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});