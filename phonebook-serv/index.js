const express = require('express');


let persons = [
<<<<<<< HEAD
=======
    {    
        id: 1,    
        name: "Arto Hellas",
        number: "040-123456"
    },  
    {    
        id: 1,    
        name: "Ada Lovelace",
        number: "39-44-5523523"
    },  
    {    
        id: 1,    
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {    
        id: 4,    
        name: "Mary Poppendick",
        number: "39-23-234345"
    }
>>>>>>> bee6a44f9ef9bf0c1a9cd13b33f9fdff92a52ddf
];

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/bye', (req, res) => {
    res.send('<h3>Hyvästi muuailma!');
});

<<<<<<< HEAD
app.get('/info', (req, res) => {
    let num = persons.length
    res.send(`<h3>Phonebook has info for ${length} people</h3>`);
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
=======
app.get('/api/persons', (req, res) => {
    res.json(persons);
>>>>>>> bee6a44f9ef9bf0c1a9cd13b33f9fdff92a52ddf
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});