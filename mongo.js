const mongoose = require('mongoose')
const url = `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`
mongoose.connect(url)