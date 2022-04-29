require("dotenv").config()
const express = require('express')
const cors = require('cors')

let usersRouter = require('./routes/users')
let productsRouter = require('./routes/products')
let cartRouter = require('./routes/cart')

let app = express()
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

const port = process.env.PORT || 3001
app.listen(port, () => {
	console.info(`Server started on port ${port}...`)
})

