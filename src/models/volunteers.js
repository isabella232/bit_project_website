const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const VolunteerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
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
        unique: true,
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

VolunteerSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log(user.password)

    next()
})

const Volunteer = mongoose.model('Volunteer', VolunteerSchema)


module.exports = Volunteer