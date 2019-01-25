ctrls

    .controller('Wenhua_aCtrl', function ($scope, $http, $rootScope, $state, $ionicModal, $ionicLoading, $ionicSlideBoxDelegate) {
        $rootScope.page = 1;
        $rootScope.totalPage = 0;
        $scope.tabactive = 1

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        })

        $scope.$on('$ionicView.afterEnter', function () {
            $http.get($rootScope.server_url + '/Wenhua/index').success(function (data) {
                $scope.lists = data.data.lists

                $rootScope.totalPage = data.data.totalPage
                $ionicLoading.hide();
            });
        })

        $scope.reloadWenhua = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/wenhua/indexMoer', {params: {page: $rootScope.page}}).success(function (data) {
                if (types == "refresher") {
                    $scope.lists = data.data.lists;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    console.log($scope.lists);
                    $scope.lists = $scope.lists.concat(data.data.lists);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });

        }
        $scope.isLoadMore = function () {
            return $rootScope.page < $rootScope.totalPage;
        }

    })
    .controller('Wenhua_bCtrl', function ($scope, $http, $rootScope, $state) {
        $scope.tabactive = 2

        $scope.$on('$ionicView.afterEnter', function () {
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

        $scope.$on('$ionicView.afterEnter', function () {
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
    .controller('WenhuaNavCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        //page_no     = 1;
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        $http.get($rootScope.server_url + '/Wenhua/wenhua_nav?yid=' + $scope.yid).success(function (data) {
            $scope.list = data.data.list
            $scope.navtitle = data.data.cate_name

        });

        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }
    })
    .controller('WenhuaInfoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        //page_no     = 1;
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        $scope.cid = $stateParams.cid;
        $http.get($rootScope.server_url + '/Wenhua/wenhua_info?yid=' + $scope.yid).success(function (data) {
            $scope.info = data.data

        });

        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }

    })

