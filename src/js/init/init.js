require( [
    "jquery" ,
    'lodash' ,
    'Mslider'
] , function ( $ , _ , Mslider ) {
    var images = [
        {
            href: '' ,
            src: 'images/1.jpg' ,
            title: '清纯美女'
        } ,
        {
            href: '' ,
            src: 'images/2.jpg' ,
            title: '阳光美女'
        } ,
        {
            href: '' ,
            src: 'images/3.jpg' ,
            title: '性感美女'
        } ,
        {
            href: '' ,
            src: 'images/4.jpg' ,
            title: '诱惑美女'
        }
    ];

/*
 * Mslider javascript 幻灯轮播插件
 * 动画算法参考 http://www.cnblogs.com/cloudgamer/archive/2009/01/06/Tween.html
 * @param        {String}        id                幻灯容器的ID名     必须
 * @param        {Object}        data              幻灯片的数据       必须
 * @param        {Boolean}       auto              是否开启自动播放   default = true
 * @param        {Number}        time              默认切换时间       default = 4000
 * @param        {Number}        speed             动画执行速度       default = 40
 * @param        {String}        effect            动画执行效果       default = [ Linear, Quint, Expo, Bounce ];
 * @param        {String}        direction         动画执行方向       default = [ Lateral, Vertical ] Lateral=横向，Vertical=竖向
 * @param        {String}        arrowLeft         幻灯Prev ID名
 * @param        {String}        arrowRight        幻灯Next ID名
 * @param        {Bollean}       isHidden          幻灯 Prev 和 Next 是否开启自动隐藏
 * @param        {String}        nav               幻灯片小导航 ID名
 * @param        {String}        navEvent          幻灯片小导航触发事件       default = [ click, mouseover ]
 * @param        {String}        current           默认导航 a className 名    default = current
 * @param        {String}        isText            默认是否显示 文本容器      default = false
 * @param        {String}        text              幻灯 Slider Text 容器的 ID名
 *
 */

    var slider = new Mslider.Mslider( {
        id: 'slider-con' ,
        data: images ,
        index: 5 ,
        auto: true ,
        direction: 'Verticals' ,        // 动画方向
        time: 4000 ,
        effect: 'Quint' ,
        nav: 'add-nav' ,
        navEvent: 'click' ,
        current: 'active' ,
        isText: true ,
        isHidden: true ,
        text: 'slider-text'
    } );

    // 点击隐藏文字提示
    document.getElementById( 'noText' ).onclick = function () {
        console.log(slider);
        slider.options.isText = false;
        document.getElementById(slider.options.isText).style.display = 'none';
    }
} );
