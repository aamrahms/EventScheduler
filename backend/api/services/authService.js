import Role from '../models/Role/role.js'
import User from '../models/user/user.js'

/**
 * save function returns a promise when data is saved
 * create a user and insert it in db
 * 
 * @param {user} the user 
 * @returns the save promise 
 */

export const signup = (user) => {
    const newUser = new User(user)
    return newUser.save()
}

export const createRole = (role) => {
    const newRole = new Role(role)
    return newRole.save()
}


export const login = (userName) => {
    const promise = User.findOne({
        userName
    }).exec()
    return promise  
}

