require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Person = require('./models/Person');
const { response } = require('express');
const { send } = require('express/lib/response');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.get('/api/persons', (req, res, next) => {
    Person
        .find({}).then(persons => {
            res.json(persons)
        })
        .catch(error => next(error))
});

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (body === undefined) {return res.status(400).json({ error: 'content missing'})}

    const person = new Person({
        name: String(body.name),
        number: String(body.number)
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: String(body.name),
        number: String(body.number)
    })

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(res => {
            res.status(204).end();
        })
        .catch(error => next(error))
});

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person){res.json(person)}
            else {res.status(404).end()}
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    let status = error.status
    if(status === undefined) {status = 500}
    console.error(error.message)
    return(
        res.status(status).send({error : `${error.message}`})
    )
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});