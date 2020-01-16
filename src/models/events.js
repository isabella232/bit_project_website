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
    volunteers: [{
        volunteer: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
        } 
    }],
    href: {
        type: String,
        default: '/turkey-trot'
    }
})

module.exports = Event