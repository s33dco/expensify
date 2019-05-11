module.exports = env => {
	if (env === undefined) {
		env = 'development'
	}
	console.log(`🛠 👉🏻 building for ${env}`)
	return require(`./config/webpack.${env}.config.js`)
}
