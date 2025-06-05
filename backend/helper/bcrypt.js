const bcrypt = require('bcrypt')
const salt = 10

const encryptPassword = (data)=>{
    // const {type} = data
    return bcrypt.hashSync(data,salt)
    
}

const decryptPassword = (data,blurPassword)=>{
    return(
        bcrypt.compareSync(data,blurPassword)
    )
}

module.exports = {encryptPassword,decryptPassword}