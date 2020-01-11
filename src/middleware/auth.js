const jwt = require('jsonwebtoken') 
const User = require('../models/volunteers')

const auth = async (req, res, next) => {
    console.log("auth")
    console.log(req.cookies.auth)
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')  
        const token = req.cookies.auth.replace('Bearer ', '') // if token exists     
        const decoded = jwt.verify(token, 'thisismysecret')         
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) { 
            res.clearCookie('auth')
            throw new Error()
         }
        req.token = token
        req.volunteer = user
     }
    catch (e) { 
        // res.status(401).send({ 
        //     error: 'Please authenticate.' 
        // }) 
        console.log("not authenticated")
    }
    next()
}

module.exports = auth  