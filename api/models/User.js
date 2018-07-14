const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const UserSchema  = new Schema({
    username:  {
        type: String,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        lowercase: true,
        index: true
   },
    salt: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String,
        lowercase: true
    },
    age: {
       type: Number,
       min: 18
    },
    hobbies: [{
        type: String,
        lowercase: true
    }],
    dateOfBirth: {
        type: Date
    }
},{
    timestamps: true
  })

const User = mongoose.model('User', UserSchema)

module.exports = User
