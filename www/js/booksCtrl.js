ctrls

    .controller('BooksCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, $sce, $ionicViewSwitcher) {
        $scope.tabactive = 1
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Yuedu/index').success(function (data) {
                $scope.lists = data.data.lists
                // console.log(data.data);
                $rootScope.totalPage = data.data.totalPage
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
    .controller('Books_bCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup) {
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Yuedu/book_b').success(function (data) {
                $scope.lists = data.data.lists

                $rootScope.totalPage = data.data.totalPage
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
    .controller('Books_cCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup, $ionicViewSwitcher) {
        $rootScope.page = 1;
        $rootScope.totalPage = 0;

        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Yuedu/book_c').success(function (data) {
                $scope.lists = data.data.lists

                $rootScope.totalPage = data.data.totalPage
            });
        });

        $scope.reloadBook = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/yuedu/bookCMore', {params: {page: $rootScope.page}}).success(function (data) {
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

        // $scope.yid = $stateParams.id;
        // $scope.cid = $stateParams.cid;
        // $scope.nav = $stateParams.nav;
        // //page_no     = 1;

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

