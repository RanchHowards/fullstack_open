const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    username: String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})
// const User = mongoose.module("User", userSchema)

module.exports = mongoose.model("User", userSchema)