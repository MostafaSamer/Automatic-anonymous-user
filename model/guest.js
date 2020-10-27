const mongoose = require('mongoose')

const guestSchema = mongoose.Schema({
    name: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    lastReq: {
        type: Date,
        default: new Date()
    }
}, {
    timestamp: true
})

const guestModel = mongoose.model('Guest', guestSchema)

module.exports = guestModel