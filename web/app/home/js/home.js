
function renderResponseConnect(response){
    console.log(response);
    document.getElementById("header").innerHTML = response;
}

function connect(){
    params = [];
    params["alias"] = document.getElementById("alias").value;
    params["pw"] = document.getElementById("pw").value;

    var xhr = new XhrRequest("POST", "http://www.thibaultstocker.fr:500/home/login", {func:renderResponseConnect});
    xhr.send(params);
}

function renderResponseLogout(response){
    console.log(response);
    document.getElementById("header").innerHTML = response;
}


function logout(){
    var xhr = new XhrRequest("POST", "http://www.thibaultstocker.fr:500/home/logout", {func:renderResponseLogout});
    xhr.send();
}

/*******************
 *
 * @param {string} method
 * @param {string} url
 * @param {function} callback
 *
 *******************/
function XhrRequest(method, url, callback){

    try {
       var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {
       var xhr = new XMLHttpRequest();
    }

    // TODO:: gestion des header



   xhr.onreadystatechange = function(){
        if(xhr.readyState == 4)
        {
            switch(xhr.status)
            {
                case 200:
                    // TODO gestion des XML
                    callback.func(xhr.responseText, callback.args);
                    break;
                default:
                    console.log('error http : ' + xhr.status);
                    return false;
                    break;
            }
        }
   };

   xhr.open(method, url, true);


   this.xhr = xhr;
 }


XhrRequest.prototype.send = function XhrRequest_send(params, type){

   if(params && type == undefined)
   {
    switch(typeof params)
    {
        case "object":
            var tmp = params;
            var spy = false;
            for(var i in tmp)
            {
                if(spy)
                    params = params + '&' + i + "=" + tmp[i];
                else
                    params = params + i + "=" + tmp[i];
                spy = true;
            }

            break;
    /*    case "string":

            this.xhr.setRequestHeader('Content-Type', 'application/json');
            params = JSON.stringify(params);
            break;*/
        default:
            console.log("Wrong XHR type");
            return false;
            break;
    }
   }

   this.xhr.send(params);
}


