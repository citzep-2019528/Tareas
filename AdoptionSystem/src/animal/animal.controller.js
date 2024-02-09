'use strict'

import { checkUpdateA } from '../utils/validator.js'
import Animal from './animal.model.js'


export const testAnimal = (req, res)=>{
    console.log('test is running')
    return res.send({message:'Test is running'})
}

//registro
export const registerAnimal =  async(req, res)=>{
    try {
        let data = req.body
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: `Registered successfully, can be logged with animal ${animal.name}`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error registering animal', err: err})
    }
}

//obtener los animales
export const seeAnimals = async (req, res) => {
    try {
        const animal = await Animal.find();
        return res.send(animal);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error' });
    }
}


//Update
export const updateAni = async (req, res) =>{
    try {
        let{id} = req.params
        let data = req.body
        let update = checkUpdateA (data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updateAnimal = await Animal.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateAnimal) return res.status(401).send({menssage: 'Animal not found and not upadate'})
        return res.send({menssage:'Update new', updateAni})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error updatting account'})
    }
}

//delete
export const deleteAni = async (req, res) =>{
    try {
        let{id} = req.params
        let deleteAnimal = await Animal.findOneAndDelete({_id: id})

        if(!deleteAnimal) return res.status(404).send({message: 'Account not found and not delete'})
        //Responder
        return res.send({message: `Account with animal ${deleteAnimal.name} delete successfully`}) 
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error deleting account'})
    }
}

