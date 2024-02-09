'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        //Capturar el formulario (body)
        let data = req.body
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered successfully, can be logeed with username ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar los datos(body)
        let {username, password} = req.body
        //Validar que el usuario exista
        let user = await User.findOne({username}) //buscar un solo registro.
        //Verificar que la contraseña coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser ={
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Responde al usuario
            return res.send({message:`Welcome ${loggedUser.name}`, loggedUser})
        }     
        return res.status(404).send({menssage: 'Invalid credentials'})   
    }catch(err){
        console.error(err)
        return res.status(500).send({menssage: 'Error to login'})  
    }
}

export const update = async(req, res)=>{
    try {
        //Obtenes el id del usuario a actualizar
        let{id} = req.params
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si date trae datos
        let update = checkUpdate(data, id) 
        if(!update) return res.status(400).send({message: 'have sub,itted some data that cannot be updated or missing data'})
        //Valida si tiene permisos(tokenizacion) *hoy no se ve*
        //Actualizar(BD)
        let updateUser = await User.findOneAndUpdate(
            {_id: id },//ObjectsID <- hexadecimal (Hora system, version Mongo, Llave privada)
            data, // datos que se van a actualizar
            {new: true}//Objeto de la BD ya actualizado
        )
        //Validar la actualizacion
        if(!updateUser) return res.status(401).send({menssage: 'User not found and not upadate'})
        //Respondo al usuario
        return res.send({menssage:'Update new', updateUser})
    } catch (err) {
        console.error(err)
        return res.status(500).send({menssage:'Error upadating account'})
    }
}

export const deleteU = async (req, res)=>{
    try {
        //Obtener el Id
        let{id} = req.params
        //Validar si esta logeado y es el mismo *No se ve hoy*
        //Eliminar(deleteOne(solo elimina no devuelve el docuento) / findOneAndDelete)
        let deleteUser = await User.findOneAndDelete({_id: id})
        //Verificar que se elimino
        if(!deleteUser) return res.status(404).send({message: 'Account not found and not delete'})
        //Responder
        return res.send({message: `Account with username ${deleteUser.username} delete successfully`}) //status 200
    } catch (err) {
        console.error(err)
        return res.status(500).send({menssage:'Error deleting account'})        
    }
}