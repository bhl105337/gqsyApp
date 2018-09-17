ctrls

    .controller('SearchCtrl', function ($scope, $stateParams, $rootScope, $http, $state, $ionicHistory) {
        $scope.lists = $rootScope.data
        $scope.keyword = $rootScope.keyword

        $scope.$on('$ionicView.beforeEnter', function () {
            //console.log($scope.keyword);
            //console.log($scope.lists);
        });

        $scope.goBackZx = function () {
            $ionicHistory.goBack(-1);
            return;
        }

        $scope.submitForm = function () {

        }
        $scope.search = function () {
            console.log(1)
        }
    })

    .controller('Search_infoCtrl', function ($scope, $stateParams, $rootScope, $http, $state, $ionicHistory) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.Url = $rootScope.server_url + '/base/search_info?id=' + $stateParams.id + '&nav=' + $stateParams.nav;
        $http.get($scope.Url).success(function (data) {
            //console.log(data.data);
            $scope.info = data.data
            $scope.p = data.content
        });

        $scope.goBackZx = function () {
            $ionicHistory.goBack(-1);
            return;
        }
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

