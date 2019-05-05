module.exports = function(env) {
	if (env === undefined) {
		env = "dev"
	}
	console.log(`🛠 👉🏻 building for ${env}`)
	return require(`./config/webpack.${env}.config.js`)
}
