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
    });
;
