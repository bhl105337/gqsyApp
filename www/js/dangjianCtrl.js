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
        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Dangjian/dangjian_a').success(function (data) {
                $scope.lists = data.data.lists.list;

                $scope.banner = data.data.lists.banner;
                $scope.init($scope.banner);

                $rootScope.totalPage = data.data.totalPage
            });

        });

        $scope.reloadDJ = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/dangjian/dangjianAMore', {params: {page: $rootScope.page}}).success(function (data) {
                if (types == "refresher") {
                    $scope.list = data.data.lists;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    $scope.list = $scope.list.concat(data.data.lists);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });

        }
        $scope.isLoadMore = function () {
            return $rootScope.page < $rootScope.totalPage;
        }

    })
    .controller('Dangjian_bCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $state, $ionicPopup, $formValid, $ionicModal) {

        $rootScope.page = 1;
        $rootScope.totalPage = 0;
        $scope.tabactive = 2

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


        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Dangjian/dangjian_b').success(function (data) {
                $rootScope.lists = data.data.lists;

                $rootScope.totalPage = data.data.totalPage;
                console.log(data.data)
            });
        })

        $scope.reloadDJ = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/dangjian/dangjianBMore', {params: {page: $rootScope.page}}).success(function (data) {
                if (types == "refresher") {
                    $scope.lists = data.data;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    console.log($rootScope.lists);
                    $scope.lists = $scope.lists.concat(data.data.lists);
                    // $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        };
        $scope.isLoadMore = function () {
            return $rootScope.page < $rootScope.totalPage;
        };

    })

    .controller('Dangjian_cCtrl', function ($scope, $http, $rootScope, $stateParams, $ionicLoading, $state, $ionicPopup, $formValid, $ionicModal) {

        $rootScope.page = 1;
        $scope.tabactive = 3

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
        $rootScope.totalPage = 0;
        $scope.tabactive = 4

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

        $scope.$on('$ionicView.afterEnter', function () {
            //page_no     = 1;
            $http.get($rootScope.server_url + '/Dangjian/dangjian_d').success(function (data) {
                $scope.lists = data.data.lists

                $rootScope.totalPage = data.data.totalPage;
            });
        })
        $scope.reloadDJ = function (types, nav = 1) {
            if (types == "infinite") {
                $rootScope.page += 1;
            } else if (types == "refresher") {
                $rootScope.page = 1
            }
            $http.get($rootScope.server_url + '/dangjian/dangjianDMore', {params: {page: $rootScope.page}}).success(function (data) {
                console.log(data.data)
                if (types == "refresher") {
                    $scope.lists = data.data.lists;
                    $scope.$broadcast('scroll.refreshComplete');
                } else {
                    console.log($rootScope.lists);
                    $scope.lists = $scope.lists.concat(data.data.lists);
                    // $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        };
        $scope.isLoadMore = function () {
            return $rootScope.page < $rootScope.totalPage;
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
