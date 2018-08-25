ctrls

    .controller('ZixunCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $formValid, $state) {

        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.newsList = [];
        var _arguments = arguments;
        var page_no = 1;
        var page_size = 20;
        var page_total = 0;
        var search = "";

        $scope.$on('$ionicView.beforeEnter', function () {
            page_no = 1;
            $http.get($rootScope.server_url + '/index/index').success(function (data) {
                $scope.newsList = data.data

            });
        });


        $scope.reloadNews = function (types) {

            $http.get($rootScope.server_url + '/index/index').success(function (data) {
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
                        $scope.searchSuccess(msg, search.keywords);
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
            //console.log(keyword);
            $rootScope.data = data.data;
            $rootScope.keyword = keyword;
            $rootScope.clearHistory();
            $state.go("search");
            return false;
        };

        //$scope.can_loadmore = function(){
        //    return page_no<page_total;
        //};
        //
        //$scope.loadMore = function(){
        //    page_no     += 1;
        //    get_goods_list(_arguments, {'cat_id':$stateParams.cat_id, 'page_no':page_no, 'page_size':page_size},function(){
        //        $scope.$broadcast('scroll.infiniteScrollComplete');
        //    });
        //};

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


