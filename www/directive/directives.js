angular.module('starter.directives', [])

    .directive('blankDirective', [function () {

    }])
    .directive('rjHoldActive', ['$ionicGesture', '$timeout', '$ionicBackdrop',
        function ($ionicGesture, $timeout, $ionicBackdrop) {
            return {
                scope: false,
                restrict: 'A',
                replace: false,
                link: function (scope, iElm, iAttrs, controller) {
                    $ionicGesture.on("hold", function () {
                        iElm.addClass('active');
                        $timeout(function () {
                            iElm.removeClass('active');
                        }, 300);
                    }, iElm);
                }
            };
        }
    ])
    .directive('rjCloseBackDrop', [function () {
        return {
            scope: false,
            restrict: 'A',
            replace: false,
            link: function (scope, iElm, iAttrs, controller) {
                var htmlEl = angular.element(document.querySelector('html'));
                htmlEl.on("click", function (event) {
                    if (event.target.nodeName === "HTML" &&
                        scope.popup.optionsPopup &&
                        scope.popup.isPopup) {
                        scope.popup.optionsPopup.close();
                        scope.popup.isPopup = false;
                    }
                });
            }
        };
    }])
    .directive('resizeFootBar', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
        // Runs during compile
        return {
            replace: false,
            link: function (scope, iElm, iAttrs, controller) {
                scope.$on("taResize", function (e, ta) {
                    if (!ta) return;
                    var scroll = document.body.querySelector("#message-detail-content");
                    var scrollBar = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
                    // console.log(scroll);
                    var taHeight = ta[0].offsetHeight;
                    var newFooterHeight = taHeight + 10;
                    newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

                    iElm[0].style.height = newFooterHeight + 'px';
                    scroll.style.bottom = newFooterHeight + 'px';
                    scrollBar.scrollBottom();
                });
            }
        };
    }])
    .directive('rjPositionMiddle', ['$window', function ($window) {
        return {
            replace: false,
            link: function (scope, iElm, iAttrs, controller) {
                var height = $window.innerHeight - 44 - 49 - iElm[0].offsetHeight;
                if (height >= 0) {
                    iElm[0].style.top = (height / 2 + 44) + 'px';
                } else {
                    iElm[0].style.top = 44 + 'px';
                }
            }
        }
    }])
    .directive('cacheSrc', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$set('src', attrs.cacheSrc);
                return;
                var img = new Image(); //创建一个Image对象，实现图片的预下载
                img.src = attrs.cacheSrc;
                if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
                    attrs.$set('src', attrs.cacheSrc);
                    return;
                }
                attrs.$set('src', attrs.loadSrc || 'img/loading.png');
                img.onload = function () {
                    img.onload = null;
                    attrs.$set('src', attrs.cacheSrc);
                };
            }
        }
    })

    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                scope.$on('$ionicView.beforeEnter', function () {
                    scope.$watch(attributes.hideTabs, function (value) {
                        $rootScope.hideTabs = value;
                    });
                });

                scope.$on('$ionicView.beforeLeave', function () {
                    $rootScope.hideTabs = false;
                });
            }
        };
    })
    .directive('contenteditable', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                function deleteBr(sHtml) {
                    return sHtml.replace(/<br>/g, "");
                }

                // view -> model
                element.bind('input', function () {
                    scope.$apply(function () {
                        element.html(deleteBr(element.html()));
                        ctrl.$setViewValue(element.html());
                    });
                });

                // model -> view
                ctrl.$render = function () {
                    element.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$render();
            }
        };
    })
    /**
     *hideShowNavBar指令
     *可以用于头部的导航条，当向上滑动屏幕时，头部导航条将会隐藏，向下滑动屏幕时，头部导航条将会显示
     *用法：
     （1）在ion-view中使用，继承原来的父级头部导航条
     <ion-view title="User" hide-back-button="false" hide-nav-bar='false' hide-show-nav-bar>
     hide-nav-bar这个指令设置值为false,表示不隐藏父级导航条，直接使用。
     然后直接写hide-show-nav-bar指令即可。

     （2）隐藏父级原来的导航条，重新定义<ion-head-bar>
     <ion-view title="User" hide-back-button="false" hide-nav-bar='true' hide-show-nav-bar>
     <ion-header-bar align-title="center" no-tap-scroll='true' class="bar-positive">
     <div class="buttons">
     <button class="button button-icon icon ion-android-arrow-back"></button>
     </div>
     <h1 class="title">Title</h1>
     <div class="buttons">
     <button class="button button-icon icon ion-navicon"></button>
     </div>
     </ion-header-bar>
     ........
     *hide-nav-bar='true'设置为true，在<ion-view>下面重新定义<ion-header-bar>标签内容即可
     *
     */
    .directive('hideShowNavBar', ['$compile', '$timeout', '$ionicGesture', function ($compile, $timeout, $ionicGesture) {
        // Runs during compile
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs, controller) {
                // 隐藏原来的导航条，重新定义
                var isHide = attrs.hideNavBar;
                var ionContent = angular.element(angular.element(element).find('ion-content')[0]);
                if (isHide === 'true') {
                    var headNavBar = angular.element(angular.element(element).find('ion-header-bar')[0]);
                } else {
                    var headNavBar = angular.element(document.querySelectorAll("div.nav-bar-block ion-header-bar"));
                    var headItem = angular.element(document.querySelectorAll('ion-header-bar')).find('div');
                }

                var cssUpStyle = {
                    '-webkit-transform': "translateY(-100%)",
                    'transform': "translateY(-100%)",
                    '-webkit-transition': "500ms all ease",
                    'transition': "500ms all ease",
                };

                var cssDownStyle = {
                    '-webkit-transform': "translateY(0%)",
                    'transform': "translateY(0%)",
                    '-webkit-transition': "500ms all ease",
                    'transition': "500ms all ease",
                };

                var css = {
                    '-webkit-transform': "",
                    'transform': "",
                    '-webkit-transition': "",
                    'transition': "",
                };

                $ionicGesture.on('dragup', function (event) {
                    if (isHide === 'false') {
                        headItem.css(cssUpStyle);
                    }

                    headNavBar.css(cssUpStyle);
                    ionContent.css({
                        'top': 0
                    });
                }, ionContent);

                $ionicGesture.on('dragdown', function (event) {
                    headNavBar.css(cssDownStyle);
                    if (isHide === 'false') {
                        headItem.css(cssDownStyle);
                    }
                    ionContent.css({
                        'top': '44px'
                    });
                }, ionContent);

                scope.$on('$ionicView.beforeLeave', function () {
                    headNavBar.css(css);
                    if (isHide === 'false') {
                        headItem.css(css);
                    }
                    ionContent.css({
                        'top': '44px'
                    });
                });

            }
        };
    }])


    /**
     *translucentBar指令
     *实现沉浸式顶部导航栏，滚动时产生不同颜色透明效果
     *用法：
     <ion-content delegate-handle="mycontent">
     ......
     </ion-content>

     <ion-header-bar align-title="center" no-tap-scroll='true' translucent-bar="mycontent" translucent-color-opacity="0.01" translucent-color="rgb(238, 187, 17)" translucent-scroll-maxtop="88">
     <div class="buttons">
     <button class="button button-icon icon ion-navicon" icon-click-round-ripple icon-round-ripple-width="20" icon-round-ripple-color="red" style="color:white"></button>
     </div>
     <h1 class="title" style="color:white">Dashboard</h1>
     <div class="buttons">
     <button class="button button-icon icon ion-android-notifications" head-red-point='true' icon-click-round-ripple style="color:white"></button>
     </div>
     </ion-header-bar>
     *
     1)要把原理view的默认header隐藏掉，<ion-view view-title="Dashboard" hide-nav-bar='true'>
     2)重新定义的<ion-header-bar>要放在</ion-content>之后，因为首先要编译ion-content指令，translucentBar指令才能从继承的父级作用域中获取ion-content的scope.$$childHead.$onScroll函数，所以<ion-header-bar>必须放在</ion-content>之后。
     3)可配置的参数
     translucent-bar："mycontent"  // 与<ion-content delegate-handle="mycontent">相同,指定操作的视图对象
     translucent-color-opacity："0.01" //header初始化的颜色的初始透明度，默认0.01
     translucent-color："rgb(238, 187, 17)" //header的颜色值
     translucent-scroll-maxtop："88" //滚动条移至多少px时开始停止渐变透明.默认88
     translucent-color-total:"90"    //计算透明度的分母，默认90

     *透明度值= translucent-scroll-maxtop / translucent-color-total
     translucent-scroll-maxtop是滚动距离顶部距离，动态数值。

     *对于需要在header中的button图标的颜色设置，可以设置style="color:white"
     eg:<h1 class="title" style="color:white">Dashboard</h1>
     <div class="buttons">
     <button class="button button-icon icon ion-android-notifications" head-red-point='true' icon-click-round-ripple style="color:white"></button>
     </div>
     */
    .directive('translucentBar', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
        return {
            scope: false,
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs) {

                var el = angular.element(element);

                var ion = angular.element(element).parent().find('ion-content').css({
                    top: '0',
                });

                var delegateHandle = attrs.translucentBar;
                var translucentColorOpacity = attrs.translucentColorOpacity;
                var translucentColor = attrs.translucentColor;
                var translucentScrollMaxtop = attrs.translucentScrollMaxtop;
                var translucentColorTotal = attrs.translucentColorTotal;

                if (!delegateHandle) {
                    throw new ('please dingfine the ion-content of delegate-handle');
                }
                if (!translucentColorOpacity) {
                    throw new ('you must set translucentColorOpacity directive of the value');
                }
                if (!translucentColor) {
                    throw new ('you must set translucentColor directive of the value');
                }

                if (!translucentScrollMaxtop) {
                    translucentScrollMaxtop = 88;
                }

                if (!translucentColorTotal) {
                    translucentColorTotal = 90;
                }

                var rgb = translucentColor.substring(4, translucentColor.length - 1);

                var initCss = {
                    'background': "rgba(" + rgb + "," + translucentColorOpacity + ")",
                }

                el.css(initCss);

                var scroollTop = null;
                var distance = null;
                var opacity = null;
                var translucentCss = null;

                scope.$$childHead.$onScroll = function () {
                    distance = $ionicScrollDelegate.$getByHandle(delegateHandle).getScrollPosition();
                    console.log(distance,translucentScrollMaxtop)
                    scroollTop = distance.top;

                    if (scroollTop <= translucentScrollMaxtop) {
                        opacity = scroollTop / translucentColorTotal;
                        translucentCss = {
                            'background': "rgba(" + rgb + "," + opacity + ")",
                        };

                        el.css(translucentCss);
                    }
                }
            }
        };
    }])

;





