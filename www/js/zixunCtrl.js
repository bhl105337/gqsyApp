ctrls

    .controller('ZixunCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $formValid, $state, $ionicModal, $timeout) {

        $scope.newsList = [];
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

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
                $scope.ItemSearch = []
                $scope.search_list = "none"
                $scope.search_backdrop = "none"
                $scope.searchModal.hide();
            }
        };

        $scope.toSearch = function (info, type) {
            $scope.ItemSearch = []
            $http.get($rootScope.server_url + '/index/search?searchName=' + info.searchName).success(function (data) {
                $scope.search_list = "inline-block";
                $scope.search_backdrop = "#333"
                console.log(data.data);
                $scope.itemSearch = data.data;
            });
        }


        $scope.$on('$ionicView.beforeEnter', function () {
            $rootScope.page = 1
            $ionicLoading.show({
                template: '加载中...'
            });
            $http.get($rootScope.server_url + '/index/index?page=' + $rootScope.page).success(function (data) {
                $scope.newsList = data.data.lists

                $rootScope.totalPage = data.data.totalPage

            });
            $ionicLoading.hide();
        });


        $scope.reloadNews = function (types) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/index/index?page=' + $rootScope.page).success(function (data) {
                if (types == "refresher") {
                    $scope.newsList = data.data.lists;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    $scope.newsList = $scope.newsList.concat(data.data.lists);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        }
        $scope.isLoadMore = function () {
            return $rootScope.page < $rootScope.totalPage;
        }

    })

    .controller('GonggaoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $formValid, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/index/tz').success(function (data) {
                $scope.list = data.data

            });
        })

        $scope.reloadTz = function (types) {

            $http.get($rootScope.server_url + '/index/tz').success(function (data) {
                $scope.newsList = data.data

                if (types == "refresher") {
                    $scope.newsList = data.data;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    $scope.newsList = $scope.newsList.concat(data.data);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        }

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

    .controller('ZixunInfoCtrl', function ($scope, $stateParams, $rootScope, $http, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $http.get($rootScope.server_url + '/index/zixun_info?yid=' + $stateParams.id).success(function (data) {
            $scope.info = data.data
            $scope.p = data.content

            //console.log(data)

        });

        $scope.goBackZx = function () {
            $state.go("tab.zixun");
            return;
        }
    })

    .controller('TzInfoCtrl', function ($scope, $stateParams, $rootScope, $http, $state) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $http.get($rootScope.server_url + '/index/zixun_info?yid=' + $stateParams.id).success(function (data) {
            $scope.info = data.data
            $scope.p = data.content


        });

        $scope.goBackZx = function () {
            $state.go("tab.tongzhi");
            return;
        }
    })


