// const validator = require('validator')
const mongoose = require('mongoose')

const Event = mongoose.model('Event', {
    eventName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    coordinator: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        min: new Date()
    },
    month: {
        type: String,
        trim: true
    },
    day: {
        type: String,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    volunteers: { 
        type: array[mongoose.Schema.Types.ObjectID],
        ref: 'users'
    },
    href: {
        type: String,
        default: '/turkey-trot'
    }
})

module.exports = Event