ctrls

    .controller('BooksCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup, $ionicModal) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Yuedu/index').success(function (data) {
                $scope.list = data.data
                //console.log(data.data);

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

        $ionicModal.fromTemplateUrl('search.html', function (searchModal) {
            $scope.searchModal = searchModal;
        }, {
            scope: $scope,
            animation: 'slide-in-right'
        });
        $scope.search = function (key) {
            if (key == "show") {
                $scope.searchModal.show();
            } else {
                $scope.searchModal.hide();
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
    .controller('Books_bCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Yuedu/book_b').success(function (data) {
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
    .controller('Books_cCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Yuedu/book_c').success(function (data) {
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

    .controller('BooksNavCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        //page_no     = 1;
        $http.get($rootScope.server_url + '/Yuedu/book_nav?yid=' + $scope.yid).success(function (data) {
            $scope.list = data.data.list
            $scope.navtitle = data.data.cate_name;
        });


        $scope.goBackYd = function () {
            if ($scope.nav == 1) {
                $state.go("tab.books")
            } else if ($scope.nav == 2) {
                $state.go("tab.books_b")
            } else if ($scope.nav == 3) {
                $state.go("tab.books_c")
            }
            return;
        }


    })
    .controller('BookInfoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.yid = $stateParams.id;
        $scope.cid = $stateParams.cid;
        $scope.nav = $stateParams.nav;
        //page_no     = 1;
        $http.get($rootScope.server_url + '/Yuedu/book_info?yid=' + $scope.yid).success(function (data) {
            $scope.info = data.data
            //console.log($scope.info)
        });


        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }


    })

