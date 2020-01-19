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
    end_time:{
        type: String,
        required: true,
        trim: true
    },
    end_date:{
        type: Date,
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
    pendingVolunteers: [{
        volunteer: {
            default: [],
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
        } 
    }],
    acceptedVolunteers: [{
        volunteer: {
            default: [],
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
        } 
    }],
    href: {
        type: String,
        default: '/turkey-trot'
    }
})

// Event.virtual('users', {
//     ref: 'User',
//     localField: '_id',
//     foreignField: ''
// })

module.exports = Event