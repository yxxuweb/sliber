define([], function () {
    var myUtil = {
        isFunction: function ( fn ) {
            return Object.prototype.toString.call( fn ) === '[object Function]';
        }
    };

    return {
        myUtil: myUtil
    }
});