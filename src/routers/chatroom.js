require('dotenv').config({ path: './.env' });
const express = require('express')
app = express()
const router = new express.Router()


router.get('/chatroom', (req,res) => { 
	res.render('chatroom')
})
module.exports = router