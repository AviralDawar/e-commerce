const express = require('express')
const router = express.Router()
const db = require('../db')

// signs up a user
router.post("/signup", async (req, res) => {
  db.query(
    ` INSERT INTO
        account
        (email, password)
      VALUES
        ("${req.body.email}", "${req.body.password}")
    `,

    (err, results) => {
      console.log(req.body.password, " ", req.body.email)
      console.log(results)
      if (err){
        console.log(err)
        res.status(500).end()
      }
      res.status(200).end()
  })  
})

// logs in a user
router.post("/login", async (req, res) => {

  db.query(
    ` SELECT
        customer_id
      FROM 
        account
      INNER JOIN
        customer
      ON
        account.account_id=customer.account_id
        AND password="${req.body.password}"
        AND email="${req.body.email}"
    `,

    (err, results) => {
      console.log(req.body.password, " ", req.body.email)
      console.log(results)
      if (err){
        console.log(err)
        res.status(500).end()
      }
      res.status(200).json({
        token: results[0].customer_id
      })
  })  

})

router.post("/signup/pop", async (req, res) => {
  db.query(`
    SELECT
      account_id
    FROM 
      account
    WHERE 
      email="${req.body.email}"`,
    (err, results) => { 
      console.log(req.body.email)
      console.log(results)
      const res2= results
      db.query(
        ` INSERT INTO
            customer
            (
              account_id,
              first_name,
              last_name,
              age,
              phone_number,
              house_number,
              street,
              city,
              state,
              country
            )
          VALUES
          (
            ${res2[0].account_id},
            "${req.body.firstName}",
            "${req.body.lastName}",
            ${req.body.age},
            ${req.body.phoneNumber},
            ${req.body.houseNumber},
            "${req.body.street}",
            "${req.body.city}",
            "${req.body.state}",
            "${req.body.country}"
            )
        `,

        (err, results) => {
          console.log(req.body.email)
          console.log(results)
          if (err){
            console.log(err)
            res.status(500).end()
          }
          res.status(200).end()
      })  
    })
})

module.exports = router