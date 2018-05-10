var ejs = require('ejs');
var fs = require("fs");
var config = require('../../config');
var sessions = require('../../lib/sessions/sessions');
var app = {'name': 'home'};



var TEMPLATE_UNLOG = '<div><input type="text" placeholder="pseudo" id="alias"/><input type="text" placeholder="password" id="pw"/><input type="button" value="Connexion" onClick="connect();"/></div>';


function start(response, postData, pathname, httpRequest) {

    sessions.logout(httpRequest.request);

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(TEMPLATE_UNLOG);
    response.end();
    return;

    /*
	path = config.root.webApp(app.name) + config.root.webHtml + '/' + app.name + '.ejs';
	console.log(path);

	params = {
		app: {
			root: {
				css: '/' + app.name + '/' + config.root.webCss,
				js : '/' + app.name + '/' + config.root.webJs,
				lib: '/' + app.name + '/' + config.root.webLib
			}
		},
	};

	var sHtml = '';
	for(var key in config.app)
	{
		sHtml += '<a href="/'+config.app[key]+'/"><div>'+config.app[key]+'</div></a> ';
	}
	params.html = sHtml;

	var content = ejs.render(fs.readFileSync(path, 'utf8'), params);

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(content);
	response.end();
	*/
}


exports.start = start;
