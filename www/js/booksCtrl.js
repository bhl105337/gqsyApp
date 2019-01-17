ctrls

    .controller('BooksCtrl', function ($scope, $http, $rootScope, $state, $formValid, $ionicPopup, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, $sce, $ionicViewSwitcher) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.tabNames = ['经典阅读', '新书推荐', '电子书'];
        $scope.slectIndex = 0;

        $scope.activeSlide = function (index) {//点击时候触发
            $ionicSlideBoxDelegate.slide(index);
            $scope.slectIndex = index;
        };
        $scope.slideChanged = function (index) {//滑动时候触发
            // $ionicSlideBoxDelegate.enableSlide(false);
            $scope.slectIndex = index;
        };
        $scope.pages = [
            "views/books/books_1.html",
            "views/books/books_2.html",
            "views/books/books_3.html",
        ];
        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="android"></ion-spinner>',
                duration: 8000
            });
        })
        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Yuedu/index').success(function (data) {
                $scope.list = data.data
                $ionicLoading.hide();
            });

            $http.get($rootScope.server_url + '/Yuedu/book_b').success(function (data2) {
                $scope.list2 = data2.data
            });

            $http.get($rootScope.server_url + '/Yuedu/book_c').success(function (data3) {
                $scope.list3 = data3.data
                console.log($scope.list3)
            });
        })

        $scope.bookContent = function (id, bookId) {
            // console.log(id)
            // console.log($rootScope.userInfo)
            $rootScope.dzsId = bookId;
            $state.go("booksinfo2");
            $ionicViewSwitcher.nextDirection("forward");
            return false;
        }

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
    .controller('BookInfoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher, $sce) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.paySrc = $sce.trustAsResourceUrl('https://www.baidu.com');

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

