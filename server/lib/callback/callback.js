function Callback(){

    this.callbacks = [];

    this.add = function callback_add(func, params){
        if(typeof func == "object")
        {
            this.callbacks.push({'func':func, "params": params});
            return true;
        } else
            return false;
    }

    this.call = function callback_call(){

    }
}


exports.callback = Callback;
