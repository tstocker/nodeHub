//  var exec = require("child_process").exec;
var querystring = require("querystring");
var ejs = require('ejs');
var fs = require("fs");
var config = require('../../config');

var app = {name: '<%= app.name%>'}

function start(response, postData) {
	path = config.root.webApp(app.name) + config.root.webHtml + '/' + app.name +'.ejs';

	params = {
		app: {
			root: {
				css: config.root.webApp(app.name) + config.root.webCss,
				js: config.root.webApp(app.name) + config.root.webJs,
				img: config.root.webApp(app.name) + config.root.webImg
				}
			},
		 };

	var content = ejs.render(fs.readFileSync(path, 'utf8'), params);

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(content);
	response.end();
}


exports.start = start;
