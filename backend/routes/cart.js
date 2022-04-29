const express = require('express')
const router = express.Router()
const db = require('../db')

// signs up a user
router.get("/", async (req, res) => {
  console.log("get all cart products")
	db.query(`
		SELECT *
		FROM
			cart
		INNER JOIN
			product
		ON
			product.product_id=cart.product_id
			AND cart.customer_id=${req.headers.authorization}
		`,

		(err, results) => {
			console.log(results)
			if (err){
        console.log(err)
        return res.status(500).end()
      }
			console.log(req.body)
			res.status(200).json({cart: results})
		}
	)
})

router.post("/", async (req, res) => {
  console.log("signup!")
	db.query(`
		INSERT INTO
			cart
		VALUES
			(${req.body.product_id}, ${req.headers.authorization}, 1)
		`,

		(err, results) => {
			if (err){
        console.log(err)
        return res.status(500).end()
      }
			console.log(req.body)
			res.status(200).end()
		}
	)
})

router.delete("/:product_id", async (req, res) => {
  console.log(req.headers.authorization)
	console.log('query: ', `DELETE FROM
			cart
		WHERE
			customer_id=${req.headers.authorization} AND
			product_id=${req.params.product_id}
`)

	db.query(`
		DELETE FROM
			cart
		WHERE
			customer_id=${req.headers.authorization} AND
			product_id=${req.params.product_id}
		`,

		(err, results) => {
			if (err){
        console.log(err)
        return res.status(500).end()
      }
			console.log(req.body)
			res.status(200).end()
		}
	)
})

module.exports = router