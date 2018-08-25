ctrls

    .controller('productCtrl', function ($scope, $rootScope, $http, $state, $stateParams, $ionicModal) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.uid = $stateParams.uid;
            $http.get($rootScope.server_url + '/Product/lists?uid=' + $scope.uid).success(function (data) {
                $scope.catelist = data.data.list
                $scope.catelists = data.data.catelist[0];
                console.log($scope.catelists);

            });
        })

        $scope.goBack = function () {
            $state.go("shoping", {uid: $scope.uid});
        }

        $ionicModal.fromTemplateUrl('about-modal.html', {
            scope: $scope,
            animation: 'slide-left'
        }).then(function (modal) {
            $scope.aboutModal = modal;
        });
    })
    .controller('cateListCtrl', function ($scope, $rootScope, $http, $state, $stateParams, $ionicModal) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.uid = $stateParams.uid;
            $scope.cid = $stateParams.cid;
            $http.get($rootScope.server_url + '/Product/catelists?uid=' + $scope.uid + '&cid=' + $scope.cid).success(function (data) {
                $scope.catelist = data.data.list;
                $scope.catelists = data.data.catelist;
                console.log(data.data.catelist);

            });
        })
        //
        $scope.goBack = function () {
            $state.go("shoping", {uid: $scope.uid});
        }
        //
        //$ionicModal.fromTemplateUrl('about-modal.html', {
        //    scope: $scope,
        //    animation: 'slide-left'
        //}).then(function (modal) {
        //    $scope.aboutModal = modal;
        //});
    })

    .controller('proListsCtrl', function ($scope, $rootScope, $http, $state, $stateParams, $ionicModal) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.uid = $stateParams.uid;
            $scope.cid = $stateParams.cid;
            $http.get($rootScope.server_url + '/Product/prolists?uid=' + $scope.uid + '&cid=' + $scope.cid).success(function (data) {
                $scope.prolist = data.data.list
                //$scope.catelists = data.data.catelist[0];
                console.log(data);

            });
        });

        $scope.goBack = function () {
            $state.go("product", {uid: $scope.uid});
        }
    })
