const mysql = require('mysql')

const db = mysql.createConnection({
	host: 'deep.moe',
	user: 'cse_boys_n_girl',
	password: 'rZtb9QwxN7h3^_KEjy3DS^mwZxBN&',
	database: 'cse_chat'
})

db.connect((err) => {
	if (err)
		console.log("Unable to establish connection to database")
})

console.log("Server connection established")

module.exports = db