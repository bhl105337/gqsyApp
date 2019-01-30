ctrls

    .controller('BooksCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, $sce, $ionicViewSwitcher) {
        $scope.tabactive = 1
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        });

        $scope.$on('$ionicView.afterEnter', function () {
            $http.get($rootScope.server_url + '/Yuedu/index').success(function (data) {
                $scope.lists = data.data.lists;

                $rootScope.totalPage = data.data.totalPage;
                $ionicLoading.hide();
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

        $scope.reloadBook = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/yuedu/indexMore', {params: {page: $rootScope.page}}).success(function (data) {
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
    .controller('Books_bCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup, $ionicLoading) {
        $scope.tabactive = 2;
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        });

        $scope.$on('$ionicView.afterEnter', function () {
            $http.get($rootScope.server_url + '/Yuedu/book_b').success(function (data) {
                $scope.lists = data.data.lists

                $rootScope.totalPage = data.data.totalPage;
                $ionicLoading.hide();
            });
        })
        $scope.reloadBook = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/yuedu/bookBMore', {params: {page: $rootScope.page}}).success(function (data) {
                if (types == "refresher") {
                    $scope.lists = data.data.lists;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    $scope.lists = $scope.lists.concat(data.data.lists);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });

        }
        $scope.isLoadMore = function () {
            return $rootScope.page < $rootScope.totalPage;
        }
    })

    .controller('Books_cCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup, $ionicViewSwitcher, $ionicLoading) {
        $scope.tabactive = 3;
        $rootScope.page = 1;
        $rootScope.totalPage = 0;
        $scope.cat_active = $rootScope.cat_active ? $rootScope.cat_active : 1;

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        });

        $scope.$on('$ionicView.afterEnter', function () {
            var params = {id: $scope.cat_active};
            $http.get($rootScope.server_url + '/Yuedu/book_E_Cate1', {params: params}).success(function (data) {
                $scope.lists = data.data.lists
                $scope.catlists = data.data.firstCate;

                $rootScope.totalPage = data.data.totalPage;
                $ionicLoading.hide();
            });
        });

        // $scope.reloadBook = function (types, nav = 1) {
        //     if (types == "infinite") {
        //         $rootScope.page += 1;
        //     } else if (types == "refresher") {
        //         $rootScope.page = 1
        //     }
        //     $http.get($rootScope.server_url + '/yuedu/book_E_Cate1', {params: {page: $rootScope.page}}).success(function (data) {
        //         if (types == "refresher") {
        //             $scope.lists = data.data.lists;
        //             $scope.$broadcast('scroll.refreshComplete');
        //         } else {
        //             console.log($scope.lists);
        //             $scope.lists = $scope.lists.concat(data.data.lists);
        //             $scope.$broadcast('scroll.infiniteScrollComplete');
        //         }
        //     });
        //
        // }
        // $scope.isLoadMore = function () {
        //     return $rootScope.page < $rootScope.totalPage;
        // }

        $scope.eTabChange = function (tabs) {
            $scope.cat_active = tabs;
            var params = {id: tabs};
            $http.get($rootScope.server_url + '/Yuedu/book_E_Cate2', {params: params}).success(function (data) {
                $scope.catlists = data.data.lists
                console.log(data)
                $ionicLoading.hide();
            });
        }

        $scope.ebooklists = function (cateName) {
            $rootScope.cat_active = $scope.cat_active;
            $state.go("ebooklists", {catename: cateName})
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }

    })

    .controller('BooksListsCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher) {
        $scope.cat_active = $rootScope.cat_active;
        $rootScope.page = 1;
        $rootScope.totalPage = 0;
        $scope.cateName = $stateParams.catename;

        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        });

        $scope.$on('$ionicView.afterEnter', function () {
            var params = {cateName: $scope.cateName, page: $rootScope.page}
            $http.get($rootScope.server_url + '/Yuedu/eBookLists', {params: params}).success(function (data) {
                $scope.lists = data.data.lists

                $rootScope.totalPage = data.data.totalPage;
                $ionicLoading.hide();
            });
        });

        $scope.reloadBook = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1;
            }

            var params = {cateName: $scope.cateName, page: $rootScope.page}
            $http.get($rootScope.server_url + '/yuedu/eBookLists', {params: params}).success(function (data) {
                if (types == "refresher") {
                    $scope.lists = data.data.lists;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    $scope.lists = $scope.lists.concat(data.data.lists);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });

        }
        $scope.isLoadMore = function () {
            return $rootScope.page < $rootScope.totalPage;
        }

        $scope.bookContent = function (id, bookId) {
            $rootScope.dzsId = bookId;
            $state.go("booksinfo2");
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }

        $scope.goBack = function () {
            $rootScope.cat_active = $scope.cat_active;
            // $ionicHistory.goBack();
            $state.go("tab.books_c");
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }

    })

    .controller('BookInfoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.yid = $stateParams.id;
        $scope.cid = $stateParams.cid;
        $scope.nav = $stateParams.nav;
        $http.get($rootScope.server_url + '/Yuedu/book_info?yid=' + $scope.yid).success(function (data) {
            $scope.info = data.data
        });


        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }
    })

    .controller('BookInfo2Ctrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher, $sce, $window) {
        $scope.h = $window.innerHeight

        $scope.bookId = $rootScope.dzsId;
        $scope.username = $rootScope.userInfo.dzs_user;
        console.log($scope.bookId)

        // $scope.paySrc = $sce.trustAsResourceUrl('http://wap.cmread.com/hywap/thrdToBookDetail?' + $scope.enterpriseId + '&' + $scope.username + '&bookid=' + $scope.bookId + "&key=" + $scope.dzskey);

        $http.get($rootScope.server_url + '/Yuedu/book_user?username=' + $scope.username + '&bookId=' + $scope.bookId).success(function (data) {
            $scope.data = data.data
            $scope.paySrc = $sce.trustAsResourceUrl($scope.data);
            console.log($scope.data)
        });

        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }

    })

