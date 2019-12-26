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
        type: String,
        required: true,
        trim: true
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
    attendeeCount: {
        type: Number,
        default: 0
    },
    href: {
        type: String,
        default: '/turkey-trot'
    }
})

module.exports = Event