
const express = require('express')
app = express()
const router = new express.Router()

app.post('/users', (req, res) => {
    const { userId } = req.body;
    chatkit
      .createUser({
        id: userId,
        name: userId,
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        if (err.error === 'services/chatkit/user_already_exists') {
          console.log(`User already exists: ${userId}`);
          res.sendStatus(200);
        } else {
          res.status(err.status).json(err);
        }
    });
});

/* while /authenticate validates all incoming connections to our Chatkit instance by responding with a token (returned by chatkit.
authenticate) if the request is valid. For the purpose of this tutorial, 
we don’t actually try to validate the request before returning the token, 
but you need to do so in your production code. */

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({
      userId: req.query.user_id,
    });
    res.status(authData.status).send(authData.body);
});

router.get('/chatroom', (req,res) => { 
	res.render('chatroom')
})
module.exports = router