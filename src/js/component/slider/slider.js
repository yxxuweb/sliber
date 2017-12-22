define( [ "jquery" , "lodash" , "pubSub" ] , function ( $ , _ , pubSub ) {
    var Mslider = function ( params ) {
        var _this = this;
        if ( !params ) return false;

        _this.slider = _this.$$( params.id );
        _this.data = params.data;
        _this.dataLength = _this.data.length;

        _this.re = null;
        _this.animateTime = null;
        _this.textArr = [];

        _this.options = {
            index: Number( params.index || 0 ) ,
            auto: params.auto || true ,
            time: params.time ? params.time :4000 ,
            speed: params.speed ? params.speed :40 ,
            effect: params.effect ? params.effect :"Quint" ,
            direction: params.direction || "Lateral" ,
            isHidden: params.isHidden ,
            nav: params.nav || 'promo-nav' ,
            navEvent: params.navEvent ? params.navEvent :"click" ,
            current: params.current ? params.current :"active" ,
            isText: !!params.isText ,
            text: params.text
        };
        _this.init();
    };
    Mslider.prototype.constructor = Mslider;

    Mslider.prototype = {
        $$: function ( id ) {
            return document.getElementById( id );
        } ,
        addEvent: function ( elem , type , fn ) {
            if ( document.addEventListener ) {
                elem.addEventListener( type , fn , false );
            } else {
                elem.attachEvent( "on" + type , fn );
            }
        } ,
        createCss: function ( elem , css ) {
            var cssStr = "";
            for ( var attr in css ) {
                cssStr += attr + ":" + css[ attr ] + ";";
            }
            elem.style.cssText = cssStr;
        } ,
        // 设置 slider 样式
        setCss: function () {
            var _this = this ,
                cssUl = {
                    width:
                        _this.options.direction === "Lateral"
                            ? _this.width * _this.li.length + "px"
                            :_this.width + "px" ,
                    height:
                        _this.options.direction === "Lateral"
                            ? _this.height + "px"
                            :_this.height * _this.li.length + "px" ,
                    margin: "0px" ,
                    clear: "both"
                } ,
                cssLi = {
                    width: _this.width + "px" ,
                    height: _this.height + "px" ,
                    float: _this.options.direction === "Lateral" ? "left" :"none" ,
                    overflow: "hidden"
                };
            _this.createCss( _this.ul , cssUl );
            for ( var i = 0; i < _this.dataLength; i++ ) {
                _this.createCss( _this.li[ i ] , cssLi );
            }
        } ,
        setClass: function ( elem , index ) {
            var _this = this;
            for ( var i = 0; i < elem.length; i++ ) {
                elem[ i ].getElementsByTagName( "a" )[ 0 ].className = "";
            }
            elem[ index ].getElementsByTagName( "a" )[ 0 ].className =
                _this.options.current;
        } ,
        setText: function ( index ) {
            var _this = this;
            _this.$$( _this.options.text ).innerText = _this.data[ index ].title;
        } ,
        // 创建主体结构
        createMainStructure: function () {
            var _this = this;
            var div;
            // 创建父结构
            _this.dom = div = document.createElement( "div" );
            var ul = document.createElement( "ul" );
            // 创建 左右箭头
            var aLeft = document.createElement( "a" );
            var aRight = document.createElement( "a" );

            // 创建代码片段，提高性能
            var fragment = document.createDocumentFragment();
            var li = null ,
                img = null ,
                a = null;
            // 创建子结构
            for ( var i = 0; i < _this.data.length; i++ ) {
                li = document.createElement( "li" );
                a = document.createElement( "a" );
                img = document.createElement( "img" );
                // 设置子结构的属性
                a.setAttribute( "href" , _this.data[ i ].href );
                a.setAttribute( "title" , _this.data[ i ].title );
                img.setAttribute( "src" , _this.data[ i ].src );
                img.setAttribute( "alt" , _this.data[ i ].title );

                a.appendChild( img );
                li.appendChild( a );
                fragment.append( li );
            }

            // 设置
            div.setAttribute( "id" , "slider" );
            div.setAttribute( "class" , "slider" );
            aLeft.setAttribute( "class" , "arrow arrow-left" );
            aLeft.setAttribute( "id" , "arrow-left" );
            aRight.setAttribute( "class" , "arrow arrow-right" );
            aRight.setAttribute( "id" , "arrow-right" );

            ul.appendChild( fragment );

            div.appendChild( ul );
            div.appendChild( aLeft );
            div.appendChild( aRight );

            _this.slider.appendChild( div );
        } ,
        createBodyStructure: function () {
            var _this = this;
            var divTitle;
            _this.title = divTitle = document.createElement( "div" );
            var divCount = document.createElement( "div" );
            var ul = document.createElement( "ul" );

            var fragment = document.createDocumentFragment();
            var li , a;

            for ( var i = 0; i < _this.dataLength; i++ ) {
                li = document.createElement( "li" );
                a = document.createElement( "a" );
                a.appendChild( document.createTextNode( i + 1 ) );
                a.setAttribute( 'data-id' , i );
                li.appendChild( a );
                fragment.appendChild( li );
            }

            divCount.setAttribute( "id" , _this.options.nav );
            divCount.setAttribute( "class" , "promo-nav" );

            divTitle.setAttribute( "id" , "slider-text" );
            divTitle.setAttribute( "class" , "slider-text" );

            ul.appendChild( fragment );
            divCount.appendChild( ul );

            _this.slider.appendChild( divCount );
            _this.options.isText ? _this.slider.appendChild( divTitle ) :'';
        } ,
        // 创建结构成功，获取一些参数
        getInitParams: function () {
            var _this = this;
            _this.ul = _this.dom.getElementsByTagName( "ul" )[ 0 ];
            _this.li = _this.ul.getElementsByTagName( "li" );
            _this.width = _this.dom.offsetWidth;
            _this.height = _this.dom.offsetHeight;
        } ,
        showIndex: function () {
            var _this = this;
            var e;

            if ( _this.options.index >= _this.dataLength ) {
                _this.options.index = _this.dataLength - 1;
            }

            if ( _this.options.index < 0 ) {
                _this.options.index = 0;
            }
            e =
                _this.options.direction === "Lateral"
                    ? _this.options.index * _this.width
                    :-_this.options.index * _this.height;

            _this.options.direction === "Lateral" ? _this.ul.style.marginLeft = -e + 'px' :_this.ul.style.marginTop = e + 'px';

            var current = _this.$$( _this.options.nav ).getElementsByTagName( 'ul' )[ 0 ].getElementsByTagName( 'li' );

            _this.setClass( current , _this.options.index );
            if ( _this.options.isText ) {
                _this.setText( _this.options.index );
            }
        } ,
        mouserover: function ( ) {
            var _this = this;
            if (_this.options.isHidden) {
                _this.$$( 'arrow-left' ).style.display = 'block';
                _this.$$( 'arrow-right' ).style.display = 'block';
            }
        },
        mouserout: function (){
            var _this = this;
            if (_this.options.isHidden) {
                _this.$$( 'arrow-left' ).style.display = 'none';
                _this.$$( 'arrow-right' ).style.display = 'none';
            }
        },
        arrowLeft: function () {
            var _this = this;
            _this.action( _this.options.index-- );
        } ,
        arrowRight: function () {
            var _this = this;
            _this.action( _this.options.index++ );
        } ,
        domEvent: function () {
            var _this = this;

            _this.addEvent( _this.slider , 'mouseover' , function () {
                _this.mouserover()
            } );
            _this.addEvent( _this.slider , 'mouseout' , function () {
                _this.mouserout()
            } );

            _this.addEvent( _this.$$( 'arrow-left' ) , 'click' , function () {
                _this.arrowLeft();
            } );
            _this.addEvent( _this.$$( 'arrow-right' ) , 'click' , function () {
                _this.arrowRight();
            } );
            _this.addEvent( _this.$$( _this.options.nav ) , 'click' , function ( e ) {
                if ( e.target.nodeName === 'A' ) {
                    _this.options.index = e.target.getAttribute( 'data-id' ) * 1;
                    _this.action();
                }
            } )
        } ,
        interval: function () {
            var _this = this;
            _this.re = setInterval( function () {
                _this.action( _this.options.index++ );
            } , _this.options.time );
        } ,
        action: function () {
            var _this = this;
            var t = (b = c = e = 0) ,
                d = _this.options.speed;

            if ( _this.options.index < 0 ) {
                _this.options.index = _this.li.length - 1;
            }
            if ( _this.options.index >= _this.li.length ) {
                _this.options.index = 0;
            }
            e =
                _this.options.direction === "Lateral"
                    ? -_this.options.index * _this.width
                    :-_this.options.index * _this.height;

            b =
                _this.options.direction === "Lateral"
                    ? parseInt( _this.ul.style.marginLeft )
                    :parseInt( _this.ul.style.marginTop );
            c = e - b;
            _this.animate( t , b , c , d );

            if ( _this.options.nav ) {
                var li = _this.$$( _this.options.nav ).getElementsByTagName( 'ul' )[ 0 ].getElementsByTagName( 'li' );
                _this.setClass( li , _this.options.index );
            }
            if ( _this.options.isText ) {
                _this.setText( _this.options.index );
            }
        } ,
        animate: function ( t , b , c , d ) {
            var _this = this;
            var effect = _this.effect( _this.options.effect );

            clearTimeout( _this.animateTime );

            if ( _this.options.direction === "Lateral" ) {
                _this.ul.style.marginLeft = parseInt( effect( t , b , c , d ) ) + "px";
            } else {
                _this.ul.style.marginTop = parseInt( effect( t , b , c , d ) ) + "px";
            }
            if ( t < d ) {
                t++;
                _this.animateTime = setTimeout( function () {
                    _this.animate( t , b , c , d );
                } , 20 );
            }
        // 动画算法
        } ,
        effect: function ( effect ) {
            var _this = this;
            switch ( effect ) {
                case "Linear":
                    return _this.Tween.Linear;
                    break;
                case "Quint":
                    return _this.Tween.Quint;
                    break;
                case "Expo":
                    return _this.Tween.Expo;
                    break;
                case "Bounce":
                    return _this.Tween.Bounce;
                    break;
                default:
                    return _this.Tween.Quint;
            }
        } ,
        Tween: {
			
            Linear: function ( t , b , c , d ) {
                return c * t / d + b;
            } ,
            Quint: function ( t , b , c , d ) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            } ,
            Expo: function ( t , b , c , d ) {
                return t === d ? b + c :c * (-Math.pow( 2 , -10 * t / d ) + 1) + b;
            } ,
            Bounce: function ( t , b , c , d ) {
                if ( (t /= d) < 1 / 2.75 ) {
                    return c * (7.5625 * t * t) + b;
                } else if ( t < 2 / 2.75 ) {
                    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
                } else if ( t < 2.5 / 2.75 ) {
                    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
                } else {
                    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
                }
            }
        } ,
        init: function () {
            var _this = this;
            _this.createMainStructure();
            _this.createBodyStructure();
            _this.getInitParams();
            _this.setCss();
            // 显示第几张图片
            _this.showIndex();

            if ( _this.options.auto ) {
                _this.interval();
            }

            if (_this.options.isHidden) {
                _this.$$( 'arrow-left' ).style.display = 'none';
                _this.$$( 'arrow-right' ).style.display = 'none';
            }

            _this.domEvent();

        }
    };

    return {
        Mslider: Mslider
    };
} );




