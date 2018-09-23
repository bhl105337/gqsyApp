ctrls

    .controller('SearchCtrl', function ($scope, $stateParams, $rootScope, $http, $state, $ionicHistory, $ionicModal) {
        $scope.lists = $rootScope.data
        $scope.keyword = $rootScope.keyword
        $scope.search_list = "none"
        $scope.search_backdrop = "none"

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.itemSearch = $rootScope.itemSearch;
            console.log($scope.itemSearch)

            //console.log($scope.keyword);
            //console.log($scope.lists);
        });

        $scope.goBack = function () {
            console.log("goBack")
            $ionicHistory.goBack();
            return false;
        }

        $scope.toSearch = function (info, type) {
            $scope.ItemSearch = []
            console.log(1)
            $http.get($rootScope.server_url + '/Dangjian/dangjian_search?searchName=' + info.searchName + '&page=' + $rootScope.page).success(function (data) {
                $scope.search_list = "inline-block";
                $scope.search_backdrop = "#333"
                $scope.itemSearch = data.data;
            });
        }

    })

    .controller('Search_infoCtrl', function ($scope, $stateParams, $rootScope, $http, $state, $ionicHistory, $ionicModal) {
        $scope.id = $stateParams.id;
        $scope.itemSearch = $rootScope.itemSearch;
        $scope.$on('$ionicView.beforeEnter', function () {

        });

        $scope.Url = $rootScope.server_url + '/base/search_info?id=' + $scope.id

        $http.get($scope.Url).success(function (data) {
            console.log(data.data);
            $scope.info = data.data
            $scope.p = data.content
        });

        $ionicModal.fromTemplateUrl('searchInfo.html', function (searchInfoModal) {
            $scope.searchInfo = searchInfoModal;
        }, {
            scope: $scope,
            animation: 'slide-in-right'
        });

        $scope.goBack = function () {
            console.log($scope.itemSearch);
            $scope.searchInfo.show();
            $ionicHistory.goBack();
            return false;
        }

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
    })

    .controller('Search_navCtrl', function ($scope, $stateParams, $rootScope, $http, $state, $ionicHistory) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.id = $stateParams.id;
        $scope.nav = $stateParams.nav;
        //page_no     = 1;
        $http.get($rootScope.server_url + '/base/search_nav?id=' + $scope.id).success(function (data) {
            $scope.list = data.data.list
            $scope.navtitle = data.data.cate_name;
            //console.log(data);
        });

        $scope.goBackZx = function () {
            $ionicHistory.goBack(-1);
            return;
        }
    })

