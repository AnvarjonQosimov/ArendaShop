const {Schema, model} = require('mongoose')


const Informations = new Schema({
    picture: {type: String, required: false},
    video: {type: String, required: false},
    initInformation: {type: String, required: true},
    additInformation: {type: String, required: true},
    price: {type: Number, required: true},
    phoneNumber: {type: String, required: true}
})


module.exports = model('Informations', Informations)