var path = require('path');

module.exports = (app) => {

	app.get('/projects', projects.index);
	app.all("*", (req, res, next) => {
		res.sendFile(path.resolve("./client/dist/client/index.html"))
	});
}
