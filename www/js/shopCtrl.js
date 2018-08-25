ctrls

    .controller('shop_indexCtrl', function ($scope, $rootScope, $http, $state, $stateParams, $ionicModal,$ionicSlideBoxDelegate) {
        $rootScope.server_url = "http://guoqishuyuan.com/app.php";
        $scope.init = function (data) {
            $ionicSlideBoxDelegate.update(true);
        };

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.uid = $stateParams.uid;
            $http.get($rootScope.server_url + '/Shopingindex/index?uid=' + $scope.uid).success(function (data) {
                $scope.list = data.data.prolist

                $scope.banner = data.data.banner
                $scope.init($scope.banner);

            });
        })

        $scope.goBack = function () {
            $state.go("tab.user");
        }

        $scope.goMore = function (uid) {
            $state.go("product", {uid: uid});
        }

        $ionicModal.fromTemplateUrl('nav-modal.html', {
            scope: $scope,
            animation: 'none'
        }).then(function (modal) {
            $scope.navModel = modal;
        });

        $scope.navShowModel = function () {
            //$scope.modifyTitle = modifyTitle;
            //$scope.showModal = showModal;
            $scope.navModel.show();
        };
    })
