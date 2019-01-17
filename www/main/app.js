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
    'starter.directives',
    'ngCordova',
    'ngCookies',
    'ionic-native-transitions'
]
angular.module('starter', requireModules)

    .run(function ($ionicPlatform, $rootScope, $ionicHistory, $ionicViewSwitcher, $ionicModal, $ionicLoading, $state, $cookies, $cookieStore, $ionicNativeTransitions, $sce, $http) {
        $rootScope.userInfo = $cookieStore.get('userInfo');
        $rootScope.userId = $rootScope.userInfo ? parseInt($rootScope.userInfo.id) : 0;
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $rootScope.userIcon = "http://guoqishuyuan.com/uploads/app/timg.png";

        $rootScope.dzsUrl = "http://wap.cmread.com/hywap/thrdToBookDetail?";
        $rootScope.enterpriseId = 77300001;


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

        $rootScope.$on('loading:show', function () {
            $ionicLoading.show({template: 'loading'})
        });

        $rootScope.$on('loading:hide', function () {
            $ionicLoading.hide()
        });

        /**
         * 用户主页
         */
        $ionicModal.fromTemplateUrl('userInfo.html', function (userModal) {
            $rootScope.modal = userModal;
        }, {
            scope: $rootScope,
            animation: 'slide-in-left'
        });
        $rootScope.showUser = function () {

            $rootScope.modal.show();
        };
        /**
         * 搜索页
         */
        $ionicModal.fromTemplateUrl('search.html', function (searchModal) {
            $rootScope.searchModal = searchModal;
        }, {
            scope: $rootScope,
            animation: 'slide-in-right'
        });
        $rootScope.search = function (key, type) {
            if (key == "show") {
                switch (type) {
                    case "zx":
                        $rootScope.sType = "zx";
                        $rootScope.server_Local = "/index/search?searchName=";
                        break;
                    case "dj":
                        $rootScope.sType = "dj";
                        $rootScope.server_Local = "/Dangjian/dangjian_search?searchName=";
                        break;
                    case "yd":
                        $rootScope.sType = "yd";
                        $rootScope.server_Local = "/Dangjian/dangjian_search?searchName=";
                        break;
                    case "wh":
                        $rootScope.sType = "wh";
                        $rootScope.server_Local = "/Dangjian/dangjian_search?searchName=";
                        break;
                    default:
                        $rootScope.sType = "dj";
                        $rootScope.server_Local = "/Dangjian/dangjian_search?searchName=";
                        break;
                }
                console.log($rootScope.sType)

                $rootScope.searchModal.show();
            } else {
                $rootScope.ItemSearch = []
                $rootScope.search_list = "none"
                $rootScope.search_backdrop = "none"
                $rootScope.searchModal.hide();
            }
        };

        /**
         * 搜索结果
         */

        $rootScope.toSearch = function (info, type) {
            var sType = $rootScope.sType;
            var server_Local = $rootScope.server_Local;
            console.log(sType)
            $rootScope.ItemSearch = []
            $http.get($rootScope.server_url + server_Local + info.searchName + '&page=' + $rootScope.page).success(function (data) {
                $rootScope.search_list = "inline-block";
                $rootScope.search_backdrop = "#333"
                $rootScope.itemSearch = data.data;
                if (type == "go") {
                    $rootScope.search_list = "none"
                    $rootScope.search_backdrop = "none"
                    $rootScope.searchModal.hide();
                    console.log(type)
                    $rootScope.searchInfo.show();
                    // $state.go("search");
                    // return false;
                }
            });
        }

        $ionicModal.fromTemplateUrl('searchInfo.html', function (searchInfoModal) {
            $rootScope.searchInfo = searchInfoModal;
        }, {
            scope: $rootScope,
            animation: 'slide-in-right'
        });

        $rootScope.search_Info = function (key) {
            if (key == "show") {
                $rootScope.searchInfo.show();
            } else {
                // $scope.ItemSearch = []
                // $scope.search_list = "none"
                // $scope.search_backdrop = "none"
                $rootScope.searchInfo.hide();
            }
        };

        /**
         * 文章详情
         * @param id
         * @param type
         * @returns {boolean}
         */
        $rootScope.goSearchInfo = function (id, type) {
            $rootScope.searchInfo.hide();
            $rootScope.searchModal.hide();
            $rootScope.itemSearch = $rootScope.itemSearch;
            $state.go("search_info", {id: id, type: type});
            return false;
        }

        /**
         * 用户模块导航
         * @param navInfo
         * @returns {boolean}
         */
        $rootScope.goUserInfoNav = function (navInfo) {
            if (!$rootScope.userInfo) {
                $rootScope.modal.hide();
                $state.go("login")
                $ionicViewSwitcher.nextDirection("back");
                return false
            } else {
                var uid = $rootScope.userInfo.id;
                switch (navInfo) {
                    case "readLog":
                        $rootScope.modal.hide();
                        $state.go("read_log", {uid: uid})
                        break;
                    case "ideaInfo":
                        $rootScope.modal.hide();
                        $state.go("read_idea", {uid: uid})
                        break;
                    case "coinInfo":
                        $rootScope.modal.hide();
                        $state.go("user_coin", {uid: uid})
                        break;
                    case "changeLog":
                        $rootScope.modal.hide();
                        $state.go("tab.read_log", {uid: uid})
                        break;
                    case "mission":
                        $rootScope.modal.hide();
                        $state.go("tab.read_log", {uid: uid})
                        break;
                    case "setting":
                        $rootScope.modal.hide();
                        $state.go("user_setting", {uid: uid})
                        break;
                }
                // $ionicViewSwitcher.nextDirection("forwoard");
                $ionicViewSwitcher.nextDirection("back");
                return false
            }
        }

        $rootScope.goLogin = function () {
            $rootScope.modal.hide();
            $state.go("login")
            $ionicViewSwitcher.nextDirection("back");
            return false
        }


        /**
         * 初始化
         */
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
var starter_services = angular.module('starter.services', []);