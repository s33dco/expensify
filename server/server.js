const path = require("path")
const express = require("express")
const app = express()
const prodPath = path.join(__dirname, "..", "production")
const port = process.env.PORT || 3000

app.use(express.static(prodPath))

app.get("*", (req, res) => {
	res.sendFile(path.join(prodPath, "index.html"))
})

app.listen(port, () => {
	console.log(`server running in ${process.env.NODE_ENV} on port ${port} 👍🏻`)
})
