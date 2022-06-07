const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

function numberValidator(number){
    let validation = false
    let type
    const ca = [...number]
    if(ca[2] === '-'){validation = true; type = 2}
    else if(ca[3] === '-'){validation = true; type = 3}
    if(type === 2){
        for(let i = 0; i < 8; i++){
            if(isNaN(ca[i]) && i != 2){
                validation = false
            }
        }
    }else if(type === 3){
        for(let i = 0; i < 8; i++){
            if(isNaN(ca[i]) && i != 3){
                validation = false
            }
        }
    }
    return validation
}

const personSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength: [3, 'Name must be at least three characters long.']
    },
    number : {
        type : String,
        minlength : [8,'Number must be at least 8 characters long'],
        validate : [numberValidator, 'Number must contain "-" after two or three digits.']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)