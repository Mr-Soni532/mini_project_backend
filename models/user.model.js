const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    email: {
        type: String,
        require: true
    }, 
    password: {
        type: String,
        require: true
    }, 
    username: {
        type: String,
        require: true
    }, 
    DOB: {
        type: String,
        require: true
    }, 
    Role: {
        type: String,
        require: true
    }, 
    location: {
        type: String,
        require: true
    }
})
const UserModel = mongoose.model('users',userSchema)
module.exports = UserModel;
