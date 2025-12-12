const {Schema, model} = require('mongoose')
const { MAX } = require('uuid')


const Informations = new Schema({
    ownerId: { type: String, required: true },
    media: [{type: String, required: true}],
    initInformation: {type: String, required: true},
    additInformation: {type: String, required: true},
    price: {type: Number, required: true},
    phoneNumber: {type: String, required: true}
})


module.exports = model('Informations', Informations)