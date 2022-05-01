const express = require('express')
const router = express.Router()
const db = require('../db')

router.patch("/", async (req, res) => {
	
	req.headers.authorization && db.query(`
		INSERT INTO 
			rating
			(product_id, customer_id, rating)
		VALUES
			(${req.body.product_id}, ${req.headers.authorization}, ${req.body.rating})
		ON DUPLICATE KEY UPDATE    
			rating=${req.body.rating}
	`,

	(err, results) => {
		console.log(results)
		if (err){
			console.log(err)
			res.status(500).end()
		}
		res.status(200).end()
	}
	)
})

router.delete("/", async (req, res) => {
	
	req.headers.authorization && db.query(`
		DELETE FROM 
			rating
		WHERE
			product_id=${req.body.product_id} AND
			customer_id=${req.headers.authorization}
	`,

	(err, results) => {
		console.log(results)
		if (err){
			console.log(err)
			res.status(500).end()
		}
		res.status(200).end()
	}
	)
})

module.exports = router