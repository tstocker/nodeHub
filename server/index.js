// requirement
let config = require("./config");
let server = require("./src/server");
let router = require("./src/router");
let fs     = require("fs");
let ejs    = require('ejs');

delete require.cache;

// define root to follow
let handle = {};

// home requirement
let home = require(__dirname + '/app/home' + '/home.js');
handle["/"] = home.start;

function promiseRepository(resolve, reject)
{
    fs.mkdir(this.path, function() {resolve()});
}

function promiseFile(resolve, reject)
{
    fs.writeFile(this.path, this.content || '', function() {resolve()});
}

function buildApp(value)
{
    return new Promise(promiseRepository.bind({'path': config.root.webApp(value)}));
}

function createWebRepositories()
{
    let value= this.value;

    // set repositories to create for project
    let pathList = [
        config.root.webApp(value) + config.root.webJs,
        config.root.webApp(value) + config.root.webCss,
        config.root.webApp(value) + config.root.webImg,
        config.root.webApp(value) + config.root.webLib,
        config.root.webApp(value) + config.root.webTmp,
        config.root.webApp(value) + config.root.webHtml,
        config.root.srv + config.root.srvApp + '/' + value
    ];

    // build promises for repositories creations
    let promiseList = [];
    for(let path of pathList) {
        promiseList.push(new Promise(promiseRepository.bind({'path': path})));
    }

    return Promise.all(promiseList)
}

/**
 * Function createFiles
 *
 * create files needs for a project
 *
 * @returns {Promise<[any]>}
 */
function createFiles() {
    console.log('repository created');
    let value= this.value;

    // set repositories to create for project
    // TODO use async method to get file contents
    let pathList = [
        {
            path: config.root.webApp(value) + config.root.webHtml + '/'+ value + '.ejs',
        },
        {
            path: config.root.webApp(value) + config.root.webCss + '/'+ value + '.css',
        },
        {
            path: config.root.webApp(value) + config.root.webJs + '/'+ value + '.js',
        },
        {
            path: config.root.srv + config.root.srvApp + '/'+ value + '/' + value + '.js',
        },
        {
            path: config.root.webApp(value) + config.root.webJs + '/' + value + '.js',
        },
        {
            path: config.root.webApp(value) + config.root.webCss + '/' + value + '.css',
        },
        {
            'path': config.root.webApp(value) + config.root.webHtml + '/' + value + '.ejs',
            'content': ejs.render(fs.readFileSync(config.root.srvSrc + '/files/serverHtml.ejs', 'utf8'), {app: {name: value, root: '\<%= app.root'}})
        },
        {
            'path': config.root.srv + config.root.srvApp + '/' + value + '/' + value + '.js',
            'content': ejs.render(fs.readFileSync(config.root.srvSrc + '/files/serverApp.js', 'utf8'), {app: {name: value}})
        }
    ];

    // build promises for repositories creations
    let promiseList = [];
    for(let oPath of pathList) {
        promiseList.push(new Promise(promiseFile.bind({'path': oPath.path, "content": oPath.content})));
    }

    return Promise.all(promiseList)
}

/**
 * Function addHandler
 * add handler for current api
 * @returns {Promise<any>}
 */
function addHandler() {
    let value = this.value;
    return new Promise((resolve, reject) => {
        let app = require('./app/'+value+'/'+value+'.js');
        handle["/"+value+'/'] = app.start;
        resolve();
    });
}


if(fs.existsSync(config.root.baseDir))
{
    let promiseApp = [];

	// building handle app
	for( let key in config.app)
	{
		let value = config.app[key];
		if(!fs.existsSync(config.root.webApp(value)))
		{
			let promiseCreation = buildApp(value);
            promiseApp.push(promiseCreation
				.then(createWebRepositories.bind({'value': value}))
				.then(createFiles.bind({'value': value}))
                .then(addHandler.bind({'value': value}))
                .catch(
                    function(err) {
                        console.error(err);
                    })
            );
		} else {
            addHandler.call({'value': value})
        }
	}

	// start server when all apps are added to handler
	Promise.all(promiseApp).then(function() {
        server.start(router.route, handle);
    });

} else
	console.log('error: config.root.baseDir doesn\'t exists '+config.root.baseDir);
