/*get和post请求例子*/

angular.module('starter', requireModules)
    .factory('ApiService', ["$window", "$http", "WAP_CONFIG", "$q", "$log", "$ionicLoading", function ($window, $http, WAP_CONFIG, $q, $log, $ionicLoading) {
        var _api = WAP_CONFIG;
        var endpoint = _api.host + ':' + _api.port;

        // public api
        return {
            //发送服务器的域名+端口，例如http://deve.sqhzg.cn:80
            endpoint: endpoint,

            //post请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），
            p: function (url, data) {
                url = endpoint + url;
                var deferred = $q.defer();
                var tempPromise;
                //显示加载进度
                $ionicLoading.show({
                    template: 'Loading...'
                });
                //判断用户是否传递了参数，如果有参数需要传递参数
                if (data != null && data != undefined && data != "") {
                    tempPromise = $http.post(url, data);
                } else {
                    tempPromise = $http.post(url);
                }
                tempPromise.success(function (data, header, config, status) {
                    deferred.resolve(data);
                    $ionicLoading.hide();
                }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                    $ionicLoading.hide();
                });
                return deferred.promise;
            },

            //get请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），
            g: function (url, data) {
                url = endpoint + url;
                var deferred = $q.defer();
                var tempPromise;
                //显示加载进度
                $ionicLoading.show({
                    template: 'Loading...'
                });
                //判断用户是否传递了参数，如果有参数需要传递参数
                if (data != null && data != undefined && data != "") {
                    tempPromise = $http.get(url, data);
                } else {
                    tempPromise = $http.get(url);
                }
                tempPromise.success(function (data, header, config, status) {
                    deferred.resolve(data);
                    $ionicLoading.hide();
                }).error(function (msg, code) {
                    deferred.reject(msg);
                    $ionicLoading.hide();
                    $log.error(msg, code);
                });
                return deferred.promise;
            }
        };
    }])