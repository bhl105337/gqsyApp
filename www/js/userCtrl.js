ctrls
/**
 *会员中心
 */
    .controller('userCtrl', function ($scope, $rootScope, $http, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.$on('$ionicView.beforeEnter', function () {
            //$scope.user = $rootScope.user.user;
            $scope.userIcon = "http://guoqishuyuan.com/uploads/app/timg001.jpg";
            if ($rootScope.user) {
                $scope.uid = $rootScope.user.user.id;
            } else if ($rootScope.uid) {
                $scope.uid = $rootScope.uid;
            } else {
                $state.go("login");
                return false;
            }

            $http.get($rootScope.server_url + '/User/userCenter?uid=' + $scope.uid).success(function (data) {
                if (data.code == "FAIL") {
                    $state.go("login");
                    return false;
                }
                $rootScope.uid = data.data.id;
                $rootScope.user = data.data;
                console.log($rootScope.uid);

            });
        })

    })

    /**
     *登录
     */
    .controller('loginCtrl', function ($scope, $rootScope, $http, $state, $formValid, $tips, $ionicPopup, $timeout, $ionicViewSwitcher, $cookies, $cookieStore, $ionicHistory) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $rootScope.login_logo = "http://guoqishuyuan.com/uploads/app/gqsy.png";

        $scope.submitForm = function (user) {
            var formRules = {
                username: {required: "请输入手机号码", mobile: '手机号格式不正确'},
                password: {required: "密码不能为空", minlen: [5, "密码至少输入5个字符"]}
            };
            if ($formValid(formRules, user)) {
                $http.post($rootScope.server_url + '/Base/login', user, null, "正在登录").success(function (data) {
                    var msg = JSON.parse(data)
                    console.log(msg);
                    if (msg.code == "FAIL") {
                        $scope.showAlert(msg);
                    } else {
                        $scope.loginSuccess(msg);
                    }
                });
            }
        };
        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }

        $scope.showAlert = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: msg.info
            });
            alertPopup.then(function (res) {
                console.log(res);
            });
        };

        $scope.loginSuccess = function (data) {
            $rootScope.userData = data.data.user;
            console.log($rootScope.userData)
            $rootScope.userIsLogin = true;
            var from = $rootScope["fromStateName"];
            $rootScope["fromStateName"] = null;
            $http.get($rootScope.server_url + '/User/userCenter?uid=' + $rootScope.userData.id).success(function (data) {
                if (data.code == "FAIL") {
                    $state.go("login");
                    return false;
                }
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 30);
                // $cookieStore.put('user', data.data.id, {'expires': expireDate});
                $cookieStore.put('userInfo', data.data, {'expires': expireDate});
                // $rootScope.clearHistory();
                $rootScope.userId = $cookies.get('user');
                $rootScope.userInfo = data.data;
                $state.go("tab.dangjian");
                console.log(data);

            });
        };
    })

    /**
     *阅读记录
     */
    .controller("Read_logCtrl", function ($scope, $rootScope, $http, $state, $stateParams, $ionicHistory, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.$on('$ionicView.beforeEnter', function () {
            //$scope.user = $rootScope.user;
            //$scope.uid = $rootScope.user.user.id;
            $scope.uid = $stateParams.uid;
            $scope.logstatus = 0;
            $http.get($rootScope.server_url + '/User/read_log?uid=' + $scope.uid).success(function (data) {
                if (data.code == "FAIL") {
                    $state.go("login");
                    return false;
                }
                $scope.lists = data.data.loglist
                if ($scope.lists != null) {
                    $scope.logstatus = 1;
                }
                console.log($scope.lists);

            });
        })

        $scope.goBack = function () {
            $rootScope.uid = $scope.uid;
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }
    })
    /**
     *阅读记录详情
     */
    .controller("Read_infoCtrl", function ($scope, $rootScope, $http, $state, $stateParams, $ionicHistory, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.uid = $stateParams.uid;
            $scope.yid = $stateParams.id;
            $http.get($rootScope.server_url + '/User/read_info?uid=' + $scope.uid + '&yid=' + $scope.yid).success(function (data) {
                if (data.code == "FAIL") {
                    $state.go("login");
                    return false;
                }
                $scope.info = data.data
                console.log(data);

            });
        })

        $scope.goBack = function (uid) {
            $rootScope.uid = uid;
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }

    })

    /**
     *学习心得列表
     */
    .controller("Read_ideaCtrl", function ($scope, $rootScope, $http, $state, $stateParams, $ionicHistory, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.$on('$ionicView.beforeEnter', function () {
            //$scope.user = $rootScope.user;
            $scope.uid = $stateParams.uid;
            $scope.logstatus = 0;
            $http.get($rootScope.server_url + '/Xinde/index?uid=' + $scope.uid).success(function (data) {
                if (data.code == "FAIL") {
                    $state.go("login");
                    return false;
                }
                $scope.lists = data.data
                if ($scope.lists != null) {
                    $scope.logstatus = 1;
                }
                console.log($scope.lists);

            });
        })

        $scope.goBack = function () {
            $rootScope.uid = $scope.uid;
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }
        $scope.goIdeaAdd = function () {
            $rootScope.uid = $scope.uid;
            $state.go("read_idea_add", {uid: $rootScope.uid});
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }
    })

    .controller("Read_idea_addCtrl", function ($scope, $rootScope, $http, $state, $stateParams, $ionicPopup, $formValid, $ionicHistory, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.uid = $stateParams.uid;
        $scope.$on('$ionicView.beforeEnter', function () {

        })

        $scope.submitFormIdeaAdd = function (idea) {
            var formRules = {
                title: {required: "标题不能为空"},
                content: {required: "内容不能为空"}
            };
            if ($formValid(formRules, idea)) {
                idea.uid = $scope.uid;
                console.log(idea);
                $http.post($rootScope.server_url + '/Xinde/add?uid=' + $scope.uid, idea, null, "正在提交").success(function (data) {
                    var msg = JSON.parse(data)
                    console.log(msg);
                    if (msg.code == "FAIL") {
                        $scope.showAlert(msg);
                    } else {
                        $scope.subSuccess(msg, $scope.uid);
                    }
                });
            }
        };

        $scope.showAlert = function (msg) {
            var alertPopup = $ionicPopup.alert({
                title: '提示',
                template: msg.info
            });
            alertPopup.then(function (res) {
                console.log(res);
            });
        };

        $scope.subSuccess = function (data, uid) {
            $rootScope.data = data.data;
            $state.go("read_idea_info", {uid: uid});
            return false;
        };

        $scope.goBack = function () {
            $rootScope.uid = $scope.uid;
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }
    })
    .controller("Read_idea_infoCtrl", function ($scope, $rootScope, $http, $state, $stateParams, $ionicHistory, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.uid = $stateParams.uid
            $scope.id = $stateParams.id
            $http.get($rootScope.server_url + '/Xinde/info?uid=' + $scope.uid + '&id=' + $scope.id).success(function (data) {
                $scope.info = data.data;
            });
        })

        $scope.goBack = function () {
            $rootScope.uid = $scope.uid;
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }
        $scope.goIdeaAdd = function () {

        }
    })

    /**
     * 积分管理
     */
    .controller("user_coinCtrl", function ($scope, $rootScope, $http, $state, $stateParams, $ionicHistory, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.$on('$ionicView.beforeEnter', function () {
            //$scope.user = $rootScope.user;
            $scope.userIcon = "http://guoqishuyuan.com/uploads/app/timg.png";
            $scope.uid = $stateParams.uid;
            $http.get($rootScope.server_url + '/User/user_coin?uid=' + $scope.uid).success(function (data) {
                if (data.code == "FAIL") {
                    $state.go("login");
                    return false;
                }
            });
        })

        $scope.goBack = function () {
            $rootScope.uid = $scope.uid;
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }
    })

    /**
     * 设置
     */
    .controller("user_settingCtrl", function ($scope, $rootScope, $http, $state, $stateParams, $ionicHistory, $ionicViewSwitcher, $cookies, $cookieStore) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.$on('$ionicView.beforeEnter', function () {
            //$scope.user = $rootScope.user;
            $scope.uid = $stateParams.uid;
            $http.get($rootScope.server_url + '/User/userCenter?uid=' + $scope.uid).success(function (data) {
                if (data.code == "FAIL") {
                    $state.go("login");
                    $ionicViewSwitcher.nextDirection("back");
                    return false;
                }

                $rootScope.uid = data.data.id;
                $rootScope.user = data.data;
            });
        })

        $scope.logout = function () {
            $ionicHistory.clearCache().then(function () {
                $cookieStore.remove('userInfo')
                $rootScope.userId = null;
                $rootScope.userInfo = null;
                $rootScope.user = null;
                $state.go("tab.dangjian");
                $ionicViewSwitcher.nextDirection("back");
                return false;
            })
        }

        $scope.goBack = function () {
            $rootScope.uid = $scope.uid;
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }
    })

