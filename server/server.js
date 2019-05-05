const path = require("path")
const express = require("express")
const app = express()
const prodPath = path.join(__dirname, "..", "production")

app.use(express.static(prodPath))

app.get("*", (req, res) => {
	res.sendFile(path.join(prodPath, "index.html"))
})

app.listen(3000, () => {
	console.log("server running")
})
