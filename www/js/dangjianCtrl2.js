ctrls
    .controller('Dangjian_aCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicSlideBoxDelegate, $state, $ionicModal, $ionicScrollDelegate) {
        console.log($rootScope.server_url)
        // $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.search_list = "none"
        $scope.search_backdrop = "none"
        $rootScope.page = 1;
        $rootScope.totalPage = 0;
        $scope.disImg = "inline-block"
        $scope.tabactive = 1


        $scope.tabsChange = function (index) {//点击时候触发
            $scope.className = true;
            $scope.tabactive = index
            if ($scope.tabactive == 1) {
                $scope.dj2 = false;
                $scope.className = false;
                console.log($scope.dj2)
            }
            if ($scope.tabactive == 2) {
                $scope.dj2 = true;
                console.log($scope.dj2)
            }
        };

        $scope.toSearch = function (info, type) {
            $scope.ItemSearch = []
            $http.get($rootScope.server_url + '/Dangjian/dangjian_search?searchName=' + info.searchName + '&page=' + $rootScope.page).success(function (data) {
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
            $scope.searchModal.hide();
            $rootScope.itemSearch = $rootScope.itemSearch;
            $state.go("search_info", {id: id, type: type});
            return false;
        }

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

            $http.get($rootScope.server_url + '/Dangjian/dangjian_b').success(function (data) {
                $scope.list2 = data.data
            });

            $http.get($rootScope.server_url + '/Dangjian/dangjian_d').success(function (data) {
                $scope.list4 = data.data

            });
        })
    })
    .controller('Dangjian_bCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $state, $ionicPopup, $formValid, $ionicModal) {

        $rootScope.page = 1;

        /**
         * 搜索页
         */
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
            $http.get($rootScope.server_url + '/Dangjian/dangjian_search?searchName=' + info.searchName + '&page=' + $rootScope.page).success(function (data) {
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
            $scope.searchModal.hide();
            $rootScope.itemSearch = $rootScope.itemSearch;
            $state.go("search_info", {id: id, type: type});
            return false;
        }


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
    .controller('Dangjian_cCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $state, $ionicPopup, $formValid, $ionicModal) {

        $rootScope.page = 1;

        /**
         * 搜索页
         */
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
            $http.get($rootScope.server_url + '/Dangjian/dangjian_search?searchName=' + info.searchName + '&page=' + $rootScope.page).success(function (data) {
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
            $scope.searchModal.hide();
            $rootScope.itemSearch = $rootScope.itemSearch;
            $state.go("search_info", {id: id, type: type});
            return false;
        }
    })
    .controller('Dangjian_dCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $state, $ionicPopup, $formValid, $ionicModal) {

        $rootScope.page = 1;

        /**
         * 搜索页
         */
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
            $http.get($rootScope.server_url + '/Dangjian/dangjian_search?searchName=' + info.searchName + '&page=' + $rootScope.page).success(function (data) {
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


    .controller('Dangjian_navCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher) {
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        //page_no     = 1;
        $http.get($rootScope.server_url + '/Dangjian/dangjian_nav?yid=' + $scope.yid).success(function (data) {
            $scope.list = data.data.list

            $scope.title = data.data.cate_name;
        });


        $scope.goBackDj = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
        }


    })
    .controller('DjInfoCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $ionicHistory, $state, $ionicViewSwitcher) {
        $scope.yid = $stateParams.id;
        $scope.nav = $stateParams.nav;
        $scope.cid = $stateParams.cid;
        //page_no     = 1;
        $http.get($rootScope.server_url + '/Dangjian/dangjian_info?yid=' + $scope.yid).success(function (data) {
            $scope.info = data.data
            $scope.p = data.content
            $scope.imgUrl = "http://guoqishuyuan.com" + $scope.info.cover
        });


        $scope.goBack = function () {
            $ionicHistory.goBack();
            $ionicViewSwitcher.nextDirection("back");
            return false;
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
