ctrls

    .controller('Wenhua_aCtrl', function ($scope, $http, $rootScope, $state, $ionicModal) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Wenhua/index').success(function (data) {
                $scope.list = data.data

            });
        })

        $scope.submitFormSearch = function (search) {
            var formRules = {
                keywords: {required: "请输入内容"}
            };
            if ($formValid(formRules, search)) {
                $http.post($rootScope.server_url + '/Base/search', search, null, "搜索中").success(function (data) {
                    var msg = JSON.parse(data)
                    if (msg.code == "FAIL") {
                        $scope.showAlert(msg);
                    } else {
                        $scope.searchSuccess(msg, search.keyword);
                    }
                });
            }
        };

        $ionicModal.fromTemplateUrl('userInfo.html', function (userModal) {
            $scope.modal = userModal;
        }, {
            scope: $scope,
            animation: 'slide-in-left'
        });

        $scope.showUser = function () {
            // $ionicBackdrop.retain();
            $scope.modal.show();
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

        $scope.searchSuccess = function (data, keyword) {
            $rootScope.data = data.data;
            $rootScope.data.keyword = keyword;
            $state.go("search");
            return false;
        };
    })
    .controller('Wenhua_bCtrl', function ($scope, $http, $rootScope, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Wenhua/index_b').success(function (data) {
                $scope.list = data.data

            });
        })

        $scope.submitFormSearch = function (search) {
            var formRules = {
                keywords: {required: "请输入内容"}
            };
            if ($formValid(formRules, search)) {
                $http.post($rootScope.server_url + '/Base/search', search, null, "搜索中").success(function (data) {
                    var msg = JSON.parse(data)
                    if (msg.code == "FAIL") {
                        $scope.showAlert(msg);
                    } else {
                        $scope.searchSuccess(msg, search.keyword);
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

        $scope.searchSuccess = function (data, keyword) {
            $rootScope.data = data.data;
            $rootScope.data.keyword = keyword;
            $state.go("search");
            return false;
        };
    })
    .controller('Wenhua_cCtrl', function ($scope, $http, $rootScope, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Wenhua/index_c').success(function (data) {
                $scope.list = data.data

            });
        })

        $scope.submitFormSearch = function (search) {
            var formRules = {
                keywords: {required: "请输入内容"}
            };
            if ($formValid(formRules, search)) {
                $http.post($rootScope.server_url + '/Base/search', search, null, "搜索中").success(function (data) {
                    var msg = JSON.parse(data)
                    if (msg.code == "FAIL") {
                        $scope.showAlert(msg);
                    } else {
                        $scope.searchSuccess(msg, search.keyword);
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

        $scope.searchSuccess = function (data, keyword) {
            $rootScope.data = data.data;
            $rootScope.data.keyword = keyword;
            $state.go("search");
            return false;
        };
    })
    .controller('WenhuaNavCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        //page_no     = 1;
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        $http.get($rootScope.server_url + '/Wenhua/wenhua_nav?yid=' + $scope.yid).success(function (data) {
            $scope.list = data.data.list
            $scope.navtitle = data.data.cate_name

        });

        $scope.goBackWh = function () {
            if ($scope.nav == 1) {
                $state.go('tab.wenhua');
            } else if ($scope.nav == 2) {
                $state.go('tab.wenhua_b');
            } else if ($scope.nav == 3) {
                $state.go('tab.wenhua_c');
            }
            return;
        }
    })
    .controller('WenhuaInfoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        //page_no     = 1;
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        $scope.cid = $stateParams.cid;
        $http.get($rootScope.server_url + '/Wenhua/wenhua_info?yid=' + $scope.yid).success(function (data) {
            $scope.info = data.data

        });

        $scope.goBackWh = function () {
            if ($scope.cid != 0) {
                $state.go('tab.wenhua_nav', {id: $scope.cid, nav: $scope.nav});
            } else {
                if ($scope.nav == 1) {
                    $state.go('tab.wenhua');
                } else if ($scope.nav == 2) {
                    $state.go('tab.wenhua_b');
                } else if ($scope.nav == 3) {
                    $state.go('tab.wenhua_c');
                }
            }
            return;
        }

    })

