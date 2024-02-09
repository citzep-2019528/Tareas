import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    keeper:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    breed:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    
    kindOfAnimal:{
        type: String,
        required:true
    }

})

export default mongoose.model('animal', animalSchema)

