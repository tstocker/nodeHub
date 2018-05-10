var ejs = require('ejs');
var fs = require("fs");
var config = require('../../config');
var sessions = require('../../lib/sessions/sessions');
var app = {'name': 'home'};


var TEMPLATE_LOG = '<div>#ALIAS#<input type="button" onClick="logout();" value="Déconnexion"/></div>';
var TEMPLATE_UNLOG = '<div><input type="text" placeholder="pseudo" id="alias"/><input type="text" placeholder="password" id="pw"/><input type="button" value="Connexion" onClick="connect();"/></div>';



function renderBlockConnection(request){
    if(sessions.isStart(request.session.data))
        return TEMPLATE_LOG.replace("#ALIAS#", request.session.data.alias);
    else {
        return TEMPLATE_UNLOG;
    }
}


function renderLoginResponseJson(response){
    console.log(response);
    this.response.writeHead(200, {'Content-Type': 'text/plain'});
    this.response.write(JSON.stringify(response));
    this.response.end();
}
function renderLoginResponse(isLog){

    var shtml = "";
    if(isLog)
        shtml = TEMPLATE_LOG.replace('#ALIAS#', this.httpRequest.request.session.data.alias);
    else {
        shtml = TEMPLATE_UNLOG;
    }

    this.response.writeHead(200, {'Content-Type': 'text/plain'});
    this.response.write(shtml);
    this.response.end();
}


function start(response, postData, pathname, httpRequest) {
    this.self = "app/home/login";
    this.response = response;
    this.httpRequest = httpRequest;
    console.log(this.httpRequest.post);
    // session value test
  /*  if(_GET['name']){
	 request.session.data.user = _GET['name'];
         console.log(request.session);
	}*/



    sessions.login(httpRequest.request, httpRequest.post, renderLoginResponse.bind(this));


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

start.prototype.renderLoginResponse = renderLoginResponse;


exports.renderBlockConnection = renderBlockConnection;
exports.start = start;
