ctrls
    .controller('Dangjian_aCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicSlideBoxDelegate, $state, $ionicModal, $ionicScrollDelegate) {
        console.log($rootScope.server_url)
        // $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $ionicModal.fromTemplateUrl('userInfo.html', function (userModal) {
            $scope.modal = userModal;
        }, {
            scope: $scope,
            animation: 'slide-in-left'
        });
        $scope.showUser = function () {

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

        $scope.init = function (data) {
            $ionicSlideBoxDelegate.update(true);
        };
        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Dangjian/dangjian_a').success(function (data) {
                $scope.list = data.data.list

                $scope.banner = data.data.banner
                $scope.init($scope.banner);
            });
        })

    })
    .controller('Dangjian_bCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $state, $ionicPopup, $formValid) {
        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Dangjian/dangjian_b').success(function (data) {
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
    .controller('Dangjian_cCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $state, $ionicPopup, $formValid) {

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
    .controller('Dangjian_dCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $state, $ionicPopup, $formValid) {
        $scope.$on('$ionicView.beforeEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Dangjian/dangjian_d').success(function (data) {
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


    .controller('Dangjian_navCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state) {
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        //page_no     = 1;
        $http.get($rootScope.server_url + '/Dangjian/dangjian_nav?yid=' + $scope.yid).success(function (data) {
            $scope.list = data.data.list

            $scope.title = data.data.cate_name;
        });


        $scope.goBackDj = function () {
            if ($scope.nav == 1) {
                $state.go("tab.dangjian");
            } else if ($scope.nav == 2) {
                $state.go("tab.dangke");
            } else if ($scope.nav == 3) {
                $state.go("tab.kaoshi");
            } else if ($scope.nav == 4) {
                $state.go("tab.zhichuang");
            }
            return;
        }


    })
    .controller('DjInfoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state) {
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        $scope.cid = $stateParams.cid;
        //page_no     = 1;
        $http.get($rootScope.server_url + '/Dangjian/dangjian_info?yid=' + $scope.yid).success(function (data) {
            $scope.info = data.data
            $scope.p = data.content
        });


        $scope.goBackDj = function () {
            if ($scope.cid != 0) {
                $state.go("tab.djnav", {id: $scope.cid, nav: $scope.nav});
            } else {
                if ($scope.nav == 1) {
                    $state.go("tab.dangjian");
                } else if ($scope.nav == 2) {
                    $state.go("tab.dangke");
                } else if ($scope.nav == 3) {
                    $state.go("tab.kaoshi");
                } else if ($scope.nav == 4) {
                    $state.go("tab.zhichuang");
                }
            }
        }
    })


//
//.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);
//})
//
//.controller('AccountCtrl', function($scope) {
//  $scope.settings = {
//    enableFriends: true
//  };
//});
