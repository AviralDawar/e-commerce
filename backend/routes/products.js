const express = require('express')
const router = express.Router()
const db = require('../db')

router.get("/", async (req, res) => {
	
	req.headers.authorization && db.query(`
		SELECT 
			product.product_id,
			name,
			stock,
			price,
			category_id,
			rating
		FROM
			product
		LEFT JOIN
			rating
		ON
			customer_id=${req.headers.authorization} AND
			product.product_id=rating.product_id
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