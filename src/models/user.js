const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
	userType: { 
		type: String, 
		trim: true,
        enum: ['volunteer', 'coordinator']
	}, 
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
            if (value.toLowerCase().includes('password')) {
                throw new Error('Invalid password.')
            }
        }
    },
    text: {
        type: String, 
        default: 'login to sign up for event',
    },
    manageHREF: { 
        type: String,
    },
    userMethod: { 
        type: String,
    },
    // events: [{
    //     event: {
    //         type: mongoose.Schema.Types.ObjectID,
    //         ref: 'Event',
    //     }
    // }],
    tokens: [{
        token: {
            type: String, required: true
        }
    }]
})

UserSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'Volunteers'
})

// TEST CASES:

// Password Length Error
const v1 = {
    "firstName": "   Jane   ",
    "lastName": "Vandy  ",
    "email": "  wvandy@super.com    ",
    "password": "123ar"
}

// Valid input
const v2 = {
    "firstName": "   Wendy   ",
    "lastName": " Stein  ",
    "email": "  wstein@super.com    ",
    "password": "123sugarr"
}

// Email error
const v3 = {
    "firstName": "   Kyle   ",
    "lastName": " Kuzma  ",
    "email": "  kk@super   ",
    "password": "123sugarr"
}

// Age error
const v4 = {
    "firstName": "   Wendy   ",
    "lastName": " Stein  ",
    "age": -10,
    "email": "  wstein@super.com    ",
    "password": "123sugarr"
}
UserSchema.methods.generateAuthToken = async function () {
    console.log("generate")
    const user = this
    const token = jwt.sign({ 
        _id: user._id.toString()
    }, 'thisismysecret')

    user.tokens = user.tokens.concat({ token })     
    await user.save()

    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    console.log('Credential')
    console.log(email)
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log(user.password)

    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User