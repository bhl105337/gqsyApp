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
    .controller('Wenhua_bCtrl', function ($scope, $http, $rootScope, $state, $ionicLoading) {
        $scope.tabactive = 2;
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        })

        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Wenhua/index_b').success(function (data) {
                $scope.lists = data.data.lists

                $rootScope.totalPage = data.data.totalPage;
                $ionicLoading.hide();
            });
        })

        $scope.reloadWenhua = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/wenhua/indexBMore', {params: {page: $rootScope.page}}).success(function (data) {
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
    .controller('Wenhua_cCtrl', function ($scope, $http, $rootScope, $state, $ionicLoading) {
        $scope.tabactive = 3;
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        })

        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Wenhua/index_c').success(function (data) {
                $scope.lists = data.data.lists

                $rootScope.totalPage = data.data.totalPage;
                $ionicLoading.hide();
            });
        })

        $scope.reloadWenhua = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/wenhua/indexCMore', {params: {page: $rootScope.page}}).success(function (data) {
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
    .controller('WenhuaNavCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher) {
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        })
        $scope.$on('$ionicView.afterEnter', function () {
            var params = {page: $rootScope.page, yid: $scope.yid};
            $http.get($rootScope.server_url + '/Wenhua/wenhua_nav', {params: params}).success(function (data) {
                $scope.lists = data.data.lists;
                console.log(data);
                $scope.navtitle = data.data.cate_name

                $rootScope.totalPage = data.data.totalPage;
                $ionicLoading.hide();
            });
        });

        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }

        $scope.reloadWenhua = function (types, nav = 1) {
            var params = {page: $rootScope.page, yid: $scope.yid};
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/wenhua/wenhua_nav', {params: params}).success(function (data) {
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

