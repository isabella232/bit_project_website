const validator = require('validator')
const mongoose = require('mongoose')

const Admin = mongoose.model('Admin', {
    firstName: {
        type: String,
        required: true,
        trim: true,
        // Check if value is all letters [A-z] - is giving errors
        // validate(value) {
        //     if (!value.value.match(letters)) {
        //         throw new Error('Invalid Characters in Name.')
        //     }
        // }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        // Check if value is all letters [A-z] - is giving errors
        // validate(value) {
        //     if (!value.value.match(letters)) {
        //         throw new Error('Invalid Characters in Name.')
        //     }
        // }
    },
    age: {
        type: Number,
        default: 0,
        // Check if value > 0 and is an integer
        validate(value) {
            if (value < 0 || !Number.isInteger(value)) {
                throw new Error('Invalid input for age.')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')){
                throw new Error('Invalid password.')
            }
        }
    },
    eventCount: {
        type: Number,
        default: 0
    },
    isCoordinator : {
        type: Boolean,
        default: false
    },
    assignedToEvent: {
        type: Boolean,
        default: false
    }
})

module.exports = Admin