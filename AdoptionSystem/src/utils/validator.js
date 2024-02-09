//Validar diferentes datos.
'use strict'

import { hash, compare } from 'bcrypt'

export const encrypt = async (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

//Validar la contrasena
export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err);
        return err
    }
}

export const checkUpdate = (data, userId) => {
    if (userId) {
        if (
            Object.entries(data).length === 0 ||
            data.password ==
            data.password == '' ||
            data.role ||
            data.role == ''
        ) {
            return false
        }
        return true
    }else{
        return false
    }
}

export const checkUpdateA = (data,animalId)=>{
    if(animalId){
        if(
            Object.entries(data).length === 0 
        ) {
            return false
        }
        return true
    }else{
        return false
    }
}
