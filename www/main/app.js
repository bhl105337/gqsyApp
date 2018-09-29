// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var requireModules = [
    'ionic',
    'starter.controllers',
    'starter.configs',
    'starter.routes',
    'starter.services',
    'starter.directives'
]
angular.module('starter', requireModules)

    .run(function ($ionicPlatform, $rootScope, $ionicHistory, $ionicViewSwitcher) {

        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
        //    if ($rootScope.userIsLogin === -1) {
        //        $rootScope.userIsLogin = false;
        //        $data.$g("/user/center").success(function (data) {
        //            $rootScope.userIsLogin = true;
        //        });
        //        return;
        //    }
        //    if (ignorename.indexOf(toState.name) == -1 && !$rootScope.userIsLogin) {
        //        event.preventDefault();
        //        $rootScope.fromStateName = fromState.name;
        //        $state.go("login");//跳转到登录界面
        //    } else if (loginname.indexOf(toState.name) != -1 && $rootScope.userIsLogin) {
        //
        //        event.preventDefault();
        //        $state.go($rootScope.defaultPage);
        //    }
        //});
        $rootScope.clearHistory = function () {
            $ionicHistory.clearHistory();
        };

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })


var ctrls = angular.module('starter.controllers', []);
var starter_services = angular.module('prosumer.services', []);