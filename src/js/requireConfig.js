
require.config({
    baseUrl: 'js/',
    urlArgs: "time=" +  (new Date()).getTime(),
    paths: {
        'init': 'init/init',
        'text': 'lib/require/text',
        'css':  'lib/require/css',
        'arttemplate': 'lib/template/template-web',
        // 'arttemplate': 'lib/template/template',
        'jquery': 'lib/jquery/jquery',
        'bootstrap': 'lib/bootstrap/bootstrap.min',
        'undersouce': 'lib/underscore/underscore-min',
        'lodash': 'lib/lodash/lodash',
        'util': 'util/util',
        'pubSub':  'class/pubSub',
        'Mslider': 'component/slider/slider'
    },
    shim: {
        bootstrap: {
            deps: ['jquery', 'css!lib/bootstrap/bootstrap.css']
        },
        Mslider: {
           d eps: ['css!component/slider/slider.css']
        }ß
    },
    config: {
        text: {
            ohXhr: function (xhr, url) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRquest');
            }
        }
    },
    map: {
        '*': {
            'css': './lib/require/css'
        }
    }
});
