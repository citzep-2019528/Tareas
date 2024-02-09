import express from 'express'
import { deleteAni, registerAnimal, seeAnimals, testAnimal, updateAni} from './animal.controller.js';


const api = express.Router();

api.get('/testAnimal', testAnimal)
api.post('/registerAnimal', registerAnimal)
api.get('/seeAnimals', seeAnimals)
api.put('/updateAnimal/:id', updateAni)
api.delete('/delete/:id', deleteAni)

export default api