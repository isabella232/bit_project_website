const jwt = require('jsonwebtoken') 
const User = require('../models/user')

const auth = async (req, res, next) => {
    try { 
        console.log(req.cookies)
        const token = req.cookies.auth.replace('Bearer ', '')    
        console.log('line 8')
        const decoded = jwt.verify(token, 'thisismysecret')     
        console.log('line 10')    
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log('line 12')
        console.log(user)
        if (!user) { 
            console.log('line 15')
            res.clearCookie('auth')
            throw new Error()
         }
         console.log('line 19')
        req.token = token
        console.log('line 21')
        req.volunteer = user
        console.log('line 23')
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