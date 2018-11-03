angular.module('starter.configs', [])
    .config(function ($httpProvider) {
        // 头部配置
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    })
    // .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //     $ionicConfigProvider.platform.ios.tabs.style('standard');
    //     $ionicConfigProvider.platform.ios.tabs.position('bottom');
    //     $ionicConfigProvider.platform.android.tabs.style('standard');
    //     $ionicConfigProvider.platform.android.tabs.position('standard');
    //
    //     $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    //     $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    //
    //     $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    //     $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    //
    //     $ionicConfigProvider.platform.ios.views.transition('ios');
    //     $ionicConfigProvider.platform.android.views.transition('android');
    // })
    .config(function ($urlRouterProvider, $httpProvider, $ionicConfigProvider) {
        // $httpProvider.interceptors.push('authInterceptor'); // 设置拦截器
        ionic.Platform.isFullScreen = false; // 禁止全屏显示

        $ionicConfigProvider.views.maxCache(15);
        $ionicConfigProvider.views.transition('platform');
        $ionicConfigProvider.views.forwardCache(true); // 缓存下一页
        $ionicConfigProvider.views.swipeBackEnabled(ionic.Platform.isIOS());
        $ionicConfigProvider.spinner.icon('ios');

        // 通用样式的兼容
        $ionicConfigProvider.platform.android.tabs.position("bottom");
        $ionicConfigProvider.platform.ios.tabs.position("bottom");
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');
        $ionicConfigProvider.tabs.style('standard');
        // false 默认所有的滚动使用native，会比js的滚动快很多，并且很平滑 ; 安卓使用,ios不使用
        $ionicConfigProvider.scrolling.jsScrolling(!ionic.Platform.isAndroid());

    })
;