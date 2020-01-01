const jwt = require('jsonwebtoken') 
const User = require('../models/volunteers')

const auth = async (req, res, next) => {
    console.log("auth")
    try {
        const token = req.header('Authorization').replace('Bearer ', '')  
        console.log(token)       
        const decoded = jwt.verify(token, 'thisismysecret')  
        console.log(decoded)          
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user)
        if (!user) { throw new Error() }
        req.token = token
        req.volunteer = user
        next()
    } catch (e) { 
        res.status(401).send({ 
            error: 'Please authenticate.' 
        }) 
    }
}

module.exports = auth  