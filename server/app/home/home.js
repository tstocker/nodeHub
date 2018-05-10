var ejs = require('ejs');
var fs = require("fs");
var config = require('../../config');
var blockConnection = require('../../app/home/login').renderBlockConnection;

var app = {'name': 'home'};


function start(response, postData, pathname, httpRequest) {
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
        content: {
            // TODO insert correctly sessions connection
            // login: blockConnection(httpRequest.request)
        }
	};

	var sHtml = '';


//    exit;

	for(var key in config.app)
	{
		sHtml += '<a href="/'+config.app[key]+'/"><div>'+config.app[key]+'</div></a> ';
	}
	params.html = sHtml;

	var content = ejs.render(fs.readFileSync(path, 'utf8'), params);

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(content);
	response.end();
}


exports.start = start;
