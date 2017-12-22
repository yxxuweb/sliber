/**
 * Created by xuyixin on 2017/4/10.
 */
({
    appDir: './src',
    baseUrl:'./js',
    dir:'./build',
    optimize: 'uglify',
    inlineText: false,
    mainConfigFile: './src/js/requireConfig.js',
    modules: [{
        name: 'init'
    }],
    fileExclusingRegExp: /^(r|build)\.js$|^(.git)|^(.vscode)$/
})