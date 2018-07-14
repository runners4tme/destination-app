const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const destinationSchema = new Schema({
  name: {
    type: String,
    uppercase: true
  },
  currency: {
    type: String,
    uppercase: true
  },
  population: {
    type: Number
  },
  languages: [ String ],
  activities: [ {
    type: String,
    lowercase: true
  }]
},{
    timestamps: true
  })

const Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination
