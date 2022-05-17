const express = require('express');


let persons = [
    {    
        id: 1,    
        name: "Arto Hellas",
        number: "040-123456"
    },  
    {    
        id: 2,    
        name: "Ada Lovelace",
        number: "39-44-5523523"
    },  
    {    
        id: 3,    
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {    
        id: 4,    
        name: "Mary Poppendick",
        number: "39-23-234345"
    }
];

const app = express();
app.use(express.json())

app.get('/api/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/bye', (req, res) => {
    res.send('<h3>Hyvästi muuailma!');
});

app.get('/api/info', (req, res) => {
    let num = persons.length
    res.send(`<h3>Phonebook has info for ${num} people</h3>`);
});

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.post('/api/persons', (req, res) => {
    let person = req.body
    person.id = Math.floor(Math.random() * 5000)
    persons = persons.concat(person)
    res.status(200).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});