
const express = require('express')
require('../db/mongoose')
const Admin = require('../models/admins')
const router = new express.Router()

// REST APIs
// Add Admin
router.post('/admin', async (req, res) =>{
    const Admin = new Admin(req.body)
    
    try { 
    	await Admin.save()
    	res.status(201).send(Admin)
    } catch(e) {
        res.status(400).send(e)
    }
})

// Read ALL admin
router.get('/admin', async (req, res) => { 
	try { 
		const admin = await Admin.find({})
		res.send(admin)
	} catch (e) { 
		res.status(500).send()
	}
})

// Read SINGLE Admin
router.get('/admin/:id', async (req, res) => { 
	try { 
		const admin = await Admin.findById(_id)

		// if not found return 404 error
		if (!Admin) { 
			return res.status(404).send()
		}

		// if found send user
		res.send(user)
	//send 500 error if error
	} catch(e) { 
		res.status(500).send()
	}
})

// Delete Admin
router.delete('/admin/:id', async (req, res) => {  
	try {
		// try to delete Admin, if found store in Admin 
		const Admin = await Admin.findByIdAndDelete(req.params.id)
		
		// if not found return 404 error
		if (!Admin) { 
			return res.status(404).send()
		}

		// if found send user
		res.send(user)
	//send 500 error if error
	} catch(e) { 
		res.status(500).send()
	}
})

// Update Admin
router.patch('./admin/:id', async (req, res) => { 
	const updates = Object.keys(req.body) 
	const allowedUpdates = ['firstName', 'lastName', 'age', 'email', 'password','eventCount', 'isCoordinator','assignedToEvent']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) { 
		return res.status(400).send({error: 'Invalid update'})
	}

	try { 
		const Admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) // TODO: check, I think wrong syntax  

		if (!Admin) { 
			return res.status(404).send()
		}

		res.send(Admin)
	} catch (e) {  
		res.status(400).send()
	}
})

// Export Admin router
module.exports = router