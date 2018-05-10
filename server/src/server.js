let http	= require("http");
let url  	= require("url");
let session = require('../../node_modules/sesh/lib/core').magicSession();
let Config = require('../config');

// TODO parse and clean format like JSON and xml and care to Method used (GET POST)
/**
 * Function parseHttpParams
 * parse get http params
 * @param param {array}
 * @returns {Array}
 */
function parseHttpParams(param){
    let res    = [];
    let result = [];

    if(param) {
        res = param.split('&');
	}

    for(let i in res){
        let keyValue = res[i].split('=');
        result[keyValue[0]] = keyValue[1];
    }

    return result;
}

function start(route,handle) {

	function onRequest(request, response) {
		let postData = "";
		let pathname = url.parse(request.url).pathname;

		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk){
			postData = postData + postDataChunk;
			console.log("Paquet POST recu "+postDataChunk+"'.");
		});

		let requestUrl = url.parse(request.url);
        let getData = requestUrl.query;

		request.addListener("end", function()
		{
			// TODO faire attention j'ai changer de place le http request pour l'entrer dans le addlistener pour recuperer le post
			//      peut etre cela causera des probleme

			// object http containning all info request response pathnam and post
			let httpRequest = {
				"request": request,
				"response": response,
				"post": parseHttpParams(postData),
				"get": parseHttpParams(getData),
				"pathname": url.parse(request.url).pathname
			};
				route(handle, httpRequest);
		});
	}
	http.createServer(onRequest).listen(Config.srv.port);
	console.log("NodeHub server start on port " + Config.srv.port);
}

exports.start = start;
