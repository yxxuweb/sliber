define([
    'util'
],function (util){
    var undefined;

    var PubSub = {};

    console.log();

    PubSub.cache = {};

    PubSub.handlers = {};

    PubSub.subscribe = function ( type, handler ) {
        if (!util.isFunction(handler)) return false;

        if (typeof this.handlers[type] !== 'undefined') {
            this.handlers[type] = [];
        }

        if (this.cached[type] instanceof Array) {
            //说明有缓存的 可以执行
            handler.apply(null, this.cached[type]);
        }

    };

    // 取消
    PubSub.unsubscribe = function (type, handler) {
        var events = this.handlers[type];
        for (var i = 0, len = events.length; i < len; i++) {
            if (events[i] === handler) {
                events.splice(i, 1);
                break;
            }
        }
    };

    // 发布
    PubSub.publish = function (type) {
        //如果有订阅的事件，这个时候就触发了
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].apply(null, args);
            }
        }
        //默认缓存
        this.cached[type] = Array.prototype.slice.call(arguments, 1);
    };


    return {
        pubSub: PubSub
    }

});