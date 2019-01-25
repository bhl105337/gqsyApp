ctrls

    .controller('ZixunCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $formValid, $state, $ionicSlideBoxDelegate, $timeout) {

        $scope.newsList = [];
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.toSearch = function (info, type) {
            $scope.ItemSearch = []
            $http.get($rootScope.server_url + '/index/search?searchName=' + info.searchName + "&page=" + $rootScope.page).success(function (data) {
                console.log(data)
                $scope.search_list = "inline-block";
                $scope.search_backdrop = "#333"
                $rootScope.itemSearch = data.data;
                if (type == "go") {
                    $scope.search_list = "none"
                    $scope.search_backdrop = "none"
                    $scope.searchModal.hide();
                    console.log(type)
                    $scope.searchInfo.show();
                    // $state.go("search");
                    // return false;
                }
            });
        }

        /**
         * 文章详情
         * @param id
         * @param type
         * @returns {boolean}
         */
        $scope.goSearchInfo = function (id, type) {
            $scope.searchInfo.hide();
            $rootScope.itemSearch = $rootScope.itemSearch;
            $state.go("search_info", {id: id, type: type});
            return false;
        }

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        })

        $scope.$on('$ionicView.afterEnter', function () {
            $rootScope.page = 1
            $http.get($rootScope.server_url + '/index/index?page=' + $rootScope.page).success(function (data) {
                $scope.newsList = data.data.lists

                $rootScope.totalPage = data.data.totalPage
                $ionicLoading.hide();
            });
        });


        $scope.reloadNews = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/index/index?page=', {params: {page: $rootScope.page}}).success(function (data) {
                if (types == "refresher") {
                    $scope.newsList = data.data.lists;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    console.log($scope.newsList);
                    $scope.newsList = $scope.newsList.concat(data.data.lists);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });

        }
        $scope.isLoadMore = function () {
            return $rootScope.page < $rootScope.totalPage;
        }

    })

    .controller('GonggaoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $formValid, $state, $ionicModal) {

        $scope.newsList = [];
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        /**
         * 搜索结果
         */
        $ionicModal.fromTemplateUrl('searchInfo.html', function (searchInfoModal) {
            $scope.searchInfo = searchInfoModal;
        }, {
            scope: $scope,
            animation: 'slide-in-right'
        });

        $scope.search_Info = function (key) {
            if (key == "show") {
                $scope.searchInfo.show();
            } else {
                // $scope.ItemSearch = []
                // $scope.search_list = "none"
                // $scope.search_backdrop = "none"
                $scope.searchInfo.hide();
            }
        };

        $scope.toSearch = function (info, type) {
            $scope.ItemSearch = []
            $http.get($rootScope.server_url + '/index/search?searchName=' + info.searchName + "&page=" + $rootScope.page).success(function (data) {
                console.log(data)
                $scope.search_list = "inline-block";
                $scope.search_backdrop = "#333"
                $rootScope.itemSearch = data.data;
                if (type == "go") {
                    $scope.search_list = "none"
                    $scope.search_backdrop = "none"
                    $scope.searchModal.hide();
                    console.log(type)
                    $scope.searchInfo.show();
                    // $state.go("search");
                    // return false;
                }
            });
        }

        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/index/tz').success(function (data) {
                $scope.list = data.data

            });
        });

        $scope.reloadNews = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
                var url = $rootScope.server_url + '/index/index?page=' + $rootScope.page
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/index/index?page=', {params: {page: $rootScope.page}}).success(function (data) {
                if (types == "refresher") {
                    $scope.newsList = data.data.lists;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    $scope.newsList = $scope.newsList.concat(data.data.lists);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });

        }

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
    })

    .controller('ZixunInfoCtrl', function ($scope, $stateParams, $rootScope, $http, $ionicHistory, $state, $ionicViewSwitcher) {

        $http.get($rootScope.server_url + '/index/zixun_info?yid=' + $stateParams.id).success(function (data) {
            $scope.info = data.data
            $scope.p = data.content
            $scope.imgUrl = "http://guoqishuyuan.com" + $scope.info.cover
        });

        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("forward")
            return false;
        }
    })

    .controller('TzInfoCtrl', function ($scope, $stateParams, $rootScope, $http, $ionicHistory, $state, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $http.get($rootScope.server_url + '/index/zixun_info?yid=' + $stateParams.id).success(function (data) {
            $scope.info = data.data
            $scope.p = data.content


        });

        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }
    })


