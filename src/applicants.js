
const express = require('express')
require('../db/mongoose')
const Applicant = require('../models/applicants')
const router = new express.Router()

// REST APIs
// Add Applicant
router.post('/applicants', async (req, res) =>{
    const applicant = new Applicant(req.body)
    console.log(applicant);
    try { 
    	await applicant.save()
    	res.status(201).send(applicant)
    } catch(e) {
        res.status(400).send(e)
    }
})

// Read ALL Applicants
router.get('/applicants', async (req, res) => { 
	try { 
		const applicants = await Applicant.find({})
		res.send(applicants)
	} catch (e) { 
		res.status(500).send()
	}
})

// Read SINGLE Applicant
router.get('/applicants/:id', async (req, res) => { 
	try { 
		const applicants = await Applicant.findById(_id)

		// if not found return 404 error
		if (!applicant) { 
			return res.status(404).send()
		}

		// if found send user
		res.send(user)
	//send 500 error if error
	} catch(e) { 
		res.status(500).send()
	}
})

// Delete Applicant
router.delete('/applicants/:id', async (req, res) => {  
	try {
		// try to delete Applicant, if found store in Applicant 
		const applicant = await Applicant.findByIdAndDelete(req.params.id)
		
		// if not found return 404 error
		if (!applicant) { 
			return res.status(404).send()
		}

		// if found send user
		res.send(user)
	//send 500 error if error
	} catch(e) { 
		res.status(500).send()
	}
})

// Update Applicant
router.patch('./Applicants/:id', async (req, res) => { 
	const updates = Object.keys(req.body) 
	const allowedUpdates = ['firstName', 'lastName', 'age', 'email', 'password','eventCount']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) { 
		return res.status(400).send({error: 'Invalid update'})
	}

	try { 
		const applicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) // TODO: check, I think wrong syntax  

		if (!applicant) { 
			return res.status(404).send()
		}

		res.send(applicant)
	} catch (e) {  
		res.status(400).send()
	}
})

// Export Applicant router
module.exports = router