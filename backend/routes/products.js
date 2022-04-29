const express = require('express')
const router = express.Router()
const db = require('../db')

router.get("/", async (req, res) => {
	
	req.headers.authorization && db.query(`
		SELECT 
			*
		FROM
			product
	`,

	(err, results) => {
		console.log(results)
		if (err){
			console.log(err)
			res.status(500).end()
		}
		res.status(200).json({ products: results })
	}
	)
})

module.exports = router