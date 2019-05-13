const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const environment = process.env.NODE_ENV || 'development'
const dist = path.join(__dirname, '..', environment)

app.use(express.static(dist))

// app.get("/firebase")	use these routes to connect to relevant db
// app.post("firebase") and keep api keys etc out of frontend.

app.get('*', (req, res) => {
	res.sendFile(path.join(dist, 'index.html'))
})

app.listen(port, () => {
	console.log(`server running in ${environment} on port ${port} 👍🏻`)
})
