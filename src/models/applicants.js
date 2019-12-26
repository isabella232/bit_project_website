const validator = require('validator')
const mongoose = require('mongoose')

const Applicant = mongoose.model('Applicant', {
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
    goal: { //answer to "why do you want to participate?"
        type: String, 
        required: true,
        trim: true,
        validate(value) { 
        }
    }
})

// TEST CASES:

// Password Length Error
const v1 = {
    "firstName":"   Jane   ",
    "lastName":"Vandy  ",
    "email":"  wvandy@super.com    ",
    "password":"123ar"
}

// Valid input
const v2 = {
	"firstName":"   Wendy   ",
	"lastName":" Stein  ",
	"email":"  wstein@super.com    ",
	"password":"123sugarr"
}

// Email error
const v3 = {
	"firstName":"   Kyle   ",
	"lastName":" Kuzma  ",
	"email":"  kk@super   ",
	"password":"123sugarr"
}

// Age error
const v4 = {
	"firstName":"   Wendy   ",
    "lastName":" Stein  ",
    "age": -10,
	"email":"  wstein@super.com    ",
	"password":"123sugarr"
}

module.exports = Applicant