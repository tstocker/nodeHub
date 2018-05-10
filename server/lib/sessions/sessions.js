function mongodb(collection){
    // TODO :: supprimer les chemins en dur
    this.client = require('mongodb').MongoClient;
    this.database = 'mongodb://localhost:27017/generic';
    this.collection = "user";

}

mongodb.prototype.find = function mongodb_Find(params, callback) {
    // TODO :: secure query params
    // TODO :: connection client a refaire dans une classe connection
    // TODO :: gerer les params differement
    this.client.connect(this.database, function(err, db){
        if(!err){
           var user = db.collection(this.collection);
           user.findOne({alias:params.alias, password:params.password}, function(err, result){
                if(err) {throw err;return false;}
                callback.func(result, callback.params);
            });
        } else {
            console.log('DB not connected :\'( : ');
        }
    }.bind(this));
}



function logout(request, callback, cbParams){
    for(var i in request.session.data)
        if(i != "history")
            delete(request.session.data[i]);

    request.session.data.user = "Guest";

    if(typeof(callback) == "function")
        callback(cbParams);
    return;
}

function isStart(sessionData){
    if(sessionData.password  && sessionData.alias)
        return true;
    else
        return false;
}

function setSession(result, params) {
    if(result){
        params.request.session.data.alias = result.alias;
        params.request.session.data.password = result.password;
        params.request.session.data.user = result.status;
        return params.callback(true);
    } else
        return params.callback(false);

}

function login(request, params, callback){

    if(isStart(request.session.data))
        return true;

    if(typeof(params) == "object")
    {
        if(params.alias && params.pw)
        {
            var db = new mongodb();
            return db.find({alias:params.alias, password:params.pw}, {func:setSession, "params":{ "request":request, "callback": callback}});
        }
    }
    return callback(false) ;
}

exports.logout = logout;
exports.login = login;
exports.isStart = isStart;
