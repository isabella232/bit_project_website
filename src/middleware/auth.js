const jwt = require('jsonwebtoken') 
const User = require('../models/user')

const auth = async (req, res, next) => {
    try { 
        console.log(req.cookies)
        const token = req.cookies.auth.replace('Bearer ', '')  
        const decoded = jwt.verify(token, 'thisismysecret')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(user)
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