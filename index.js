require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Person = require('./models/Person');
const { response } = require('express');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        console.log(req.body)
        console.log(persons)
        res.json(persons)
    })
});

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(req.body)

    if (body === undefined) {return res.status(400).json({ error: 'content missing'})}

    const person = new Person({
        name: String(body.name),
        number: String(body.number)
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id)
        .then(result => {
            res.status(204).end();
        })
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
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