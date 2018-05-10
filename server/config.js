// list of app
// add new app here to create a new app with routes and default files
let app = ['home'];

let root = {};

root.baseDir = __dirname.replace(/(\/|\\)server$/, '');
root.web = root.baseDir + '/web';
root.webApp = function (app) {return root.web + '/app/' + app;};
root.webAppJs =  function (app) {return '/' + app + '/js';};
root.webAppCss =  function (app) {return '/' + app + '/css';};
root.webAppImg =  function (app) {return '/' + app + '/img';};
root.webAppLib =  function (app) {return '/' + app + '/lib';};
root.webAppTmp =  function (app) {return '/' + app + '/tmp';};
root.webAppHtml = function (app) {return '/' + app + '/html';};
root.webJs = '/js';
root.webCss = '/css';
root.webImg = '/img';
root.webLib = '/lib';
root.webTmp = '/tmp';
root.webHtml = '/html';
root.test = '/test';
root.srv = root.baseDir + '/server';
root.srvSrc = root.srv + '/src';
root.srvApp = '/app';

let srv = {
    port: 500
};

exports.srv = srv;
exports.app = app;
exports.root = root;
