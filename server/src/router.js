let fs = require("fs");
let config = require("../config");

/***************************
 * Function: root404
 *
 * Redirect to 404 error page
 *
 * @param {object} response
 ***************************/
function root404(pathname, response){
	console.log("Aucun gestionnaire associee" + pathname);
	response.writeHead(404, {"Content-Type": "text/html"});
	// TODO create a default 404 page
	response.write("<div>404 Page non trouvee</div>");
	response.end();

	return;
}

/**************************
 * Function : readPath
 *
 * Read File and write response
 *
 * @param {object} response
 * @param {string} sPath
 * @param {string} sFileType
 ***************************/
function readPath(response, sPath, sFileType)
{
	let aFileType = Array();
	// list of mime type accepted
	aFileType['js']  = {mime:'application/javascript', encode: 'utf8'};
	aFileType['css'] = {mime:'text/css', encode: 'utf8'};
	aFileType['png'] = {mime:'image/png', encode: ''};
	aFileType['gif'] = {mime:'image/gif', encode: ''};
	aFileType['jpg'] = {mime:'image/jpeg', encode: ''};

	// Init web root if it's not a test server
    let root = '';

	// TODO dont remember why there is /app need to look for it
	if(!/^\/tests\//.test(sPath))
	{
        root = config.root.web + '/app';
	} else {
        root = config.root.srv;
	}

	sPath = decodeURIComponent(sPath);

	// read file and write response
	if(fs.existsSync(root + sPath))
	{
		fs.readFile(root + sPath, aFileType[sFileType].encode, function (err,data) {
			if (err)
			{
				console.log(err);

				return root404(sPath, response);
			}
			response.writeHead(200, {'Content-Type': aFileType[sFileType].mime});
			response.write(data);
			response.end();
		});

		return;
	}

	return root404(sPath, response);
}

/***********************
 * function serverPath
 *      root to server page or 404
 * @param {object} response
 * @param {array} postData
 * @param {string} pathname
 * @param {object} httpRequest
 ***********************/
function serverPath(response, postData, pathname, httpRequest){
    let rootSrv = config.root.srv + '/app' + pathname + '.js';

    // TODO faire le test de passage de parametre
    if(fs.existsSync(rootSrv))
	{
        return require(rootSrv).start(response, postData, pathname,httpRequest);
	}

	return root404(pathname, response);
}

/**
 * Function : route
 *
 * Route path to authorised source is this one exist
 *
 * Parameters:
 * @param {array} handle
 * @param {object} httpRequest
 */
function route(handle, httpRequest) {

	let response = httpRequest.response;
	let postData = httpRequest.post;
	let pathname = httpRequest.pathname;

	if (typeof handle[pathname] === "function") {
		// access to server source
		handle[pathname](response, postData, pathname, httpRequest);
	} else {
		// access to front web source
		switch (true)
		{
            case (!/\..+/.test(pathname)):
                return serverPath(response, postData, pathname, httpRequest);
                break;
			case /\.(css)$/.test(pathname):
			    return readPath(response, pathname, 'css');
				break;
			case /\.(js)$/.test(pathname):
				return readPath(response, pathname, 'js');
				break;
			case /\.(png)$/.test(pathname):
			    return readPath(response, pathname, 'png');
				break;
			case /\.(gif)$/.test(pathname):
				return readPath(response, pathname, 'gif');
				break;
			case /\.(jpg)$/.test(pathname):
				return readPath(response, pathname, 'jpg');
				break;
			default:
				return root404(pathname, response);
		}
	}
}

exports.route = route;