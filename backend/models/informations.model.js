const {Schema, model} = require('mongoose')
const { MAX } = require('uuid')


const Informations = new Schema({
    ownerId: { type: String, required: true },
    // store email coming from Firebase for easier lookups
    userEmail: { type: String, required: false },
    media: [{type: String, required: true}],
    initInformation: {type: String, required: true},
    additInformation: {type: String, required: true},
    views: { type: Number, default: 0 },
    price: {type: Number, required: true},
    phoneNumber: {type: String, required: true}
},
{ timestamps: true },
)


module.exports = model('Informations', Informations)