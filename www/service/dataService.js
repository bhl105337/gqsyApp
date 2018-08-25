starter_services.factory('$data', function ($defer, $local, appserver, $http, $rootScope, $tips, $location, $ionicPlatform) {


    var dataService = function () {
        this.showLoading = true;
    };

    dataService.prototype.closeLoading = function () {
        this.showLoading = false;
        return this;
    };

    dataService.prototype.request = function (remoteUrl, method, data, deferred, localKey) {
        $http({
            method: method || "GET",
            url: remoteUrl,
            params: method == "POST" ? null : data,
            data: method == "POST" ? data : null,
            headers: {
                'Applet-Device-id': $rootScope.$DeviceId,
            }
        }).success(function (data) {
            $tips.hideLoading();
            if (data.status == "n") {
                switch (data.code) {
                    case "NO_LOGIN":
                        $rootScope.user = null;
                        $rootScope.userIsLogin = false;
                        $local.remove("$data.get./user/center");
                        $location.path("/login");
                        break;
                    case "GO_BACK":
                        $state.goBack();
                        break;
                    default:
                        $tips.alert(data.info).then(function () {
                            deferred.reject({code: data.code, info: data.info, status: 200});
                        });
                }
            } else if (!data.status) {
                $tips.alert(data).then(function () {
                    deferred.reject({code: "JSON_ERR", info: data.info, status: 200});
                });
            } else {
                localKey && !data.demo && $local.set(localKey, data.data);
                deferred.resolve(data.data);
            }
        }).error(function (err, status) {
            $tips.hideLoading();io
            $tips.alert(err || remoteUrl).then(function () {
                deferred.reject({code: "HTTP_ERR", info: err, status: status});
            });
        });
    };
    dataService.prototype.$http = function (remoteUrl, method, data, deferred, localKey) {
        if (this.showLoading !== false) {
            $tips.showLoading();
        }
        var _this = this;
        $ionicPlatform.ready(function () {
            if ($rootScope.$DeviceId) {
                _this.request(remoteUrl, method, data, deferred, localKey);
                return;
            }
            if ($rootScope.runtimeENV == "dev") {
                $rootScope.$DeviceId = appserver.DeviceId;
            } else {
                $rootScope.$DeviceId = device.uuid;
            }
            if (!$rootScope.$DeviceId) {
                $tips.alert("设备信息获取失败");
            } else {
                _this.request(remoteUrl, method, data, deferred, localKey);
            }
        });
    };
    dataService.prototype.$g = function (key, data, url, showLoading) {
        var dataStr = data ? "." + angular.toJson(data) : "";
        var localKey = "$data.get." + key + dataStr;
        var localVal = $local.get(localKey);

        var deferred = $defer.get();
        if (localVal !== null) {
            deferred.resolve(localVal);
            return deferred.promise;
        }
        var remoteUrl = url ? url : $rootScope.remoteUrl + key;
        this.showLoading = showLoading;
        this.$http(remoteUrl, "GET", data, deferred, localKey);
        return deferred.promise;
    };
    dataService.prototype.$p = function (key, data, url, showLoading) {
        var dataStr = data ? "." + angular.toJson(data) : "";
        var localKey = "$data.post." + key + dataStr;
        var localVal = $local.get(localKey);
        var deferred = $defer.get();
        if (localVal !== null) {
            deferred.resolve(localVal);
            return deferred.promise;
        }
        var remoteUrl = url ? url : $rootScope.remoteUrl + key;
        this.showLoading = showLoading;
        this.$http(remoteUrl, "POST", data, deferred, localKey);
        return deferred.promise;
    };
    dataService.prototype.call = function (key, callback) {
        var localKey = "$data.call." + key;
        var localVal = $local.get(localKey);
        var deferred = $defer.get();
        if (localVal !== null) {
            deferred.resolve(localVal);
            return deferred.promise;
        }
        if (typeof callback == "function") {
            var data = callback();
            $local.set(localKey, data);
            deferred.resolve(data);
        } else {
            deferred.reject({code: "CALL_ERR", info: "callback error", status: 200});
        }
        return deferred.promise;
    };
    dataService.prototype.$r = function (update) {
        var deferred = $defer.get();
        if (!update.key) {
            deferred.reject({code: "KEY_ERR", info: "undefined key!", status: 200});
            return deferred.promise;
        }
        var method = "";
        switch (update.types) {
            case "call":
                var localKey = "$data.call." + update.key;
                break;
            case "post":
                var dataStr = update.params ? "." + angular.toJson(update.params) : "";
                var localKey = "$data.post." + update.key + dataStr;
                method = "POST";
                break;
            case "get":
            default:
                var dataStr = update.params ? "." + angular.toJson(update.params) : "";
                var localKey = "$data.get." + update.key + dataStr;
                method = "GET";
        }
        if (update.data) {
            $local.set(localKey, update.data);
            deferred.resolve(localKey);
        } else if (method) {
            var remoteUrl = $rootScope.remoteUrl + update.key;
            this.$http(remoteUrl, method, update.params, deferred, localKey);
        } else {
            deferred.reject({code: "DATA_ERR", info: "undefined data!", status: 200});
            return deferred.promise;
        }
        return deferred.promise;
    };
    dataService.prototype.remove = function (removeOptions) {
        var deferred = $defer.get(false);
        if (!removeOptions.key) {
            deferred.reject({code: "KEY_ERR", info: "undefined key!", status: 200});
            return deferred.promise;
        }
        switch (removeOptions.types) {
            case "call":
                var localKey = "$data.call." + removeOptions.key;
                break;
            case "post":
                var dataStr = removeOptions.params ? "." + angular.toJson(removeOptions.params) : "";
                var localKey = "$data.post." + removeOptions.key + dataStr;
                break;
            case "get":
            default:
                var dataStr = removeOptions.params ? "." + angular.toJson(removeOptions.params) : "";
                var localKey = "$data.get." + removeOptions.key + dataStr;
        }
        $local.remove(localKey);
        deferred.resolve(localKey);
        return deferred.promise;
    };
    dataService.prototype.$d = function (key, data, url, showLoading) {
        var dataStr = data ? "." + angular.toJson(data) : "";
        var localKey = "$data.get." + key + dataStr;
        var localVal = $local.get(localKey);
        var deferred = $defer.get();
        deferred.promise.loading = function (callback) {
            deferred.loadingCallback = callback;
            return deferred.promise;
        };
        deferred.promise.done = function (callback) {
            deferred.doneCallback = callback;
            return deferred.promise;
        };
        deferred.promise.then(function () {
            typeof deferred.doneCallback == "function" && deferred.doneCallback.apply(deferred.promise, arguments);
        }, function (data) {
            typeof deferred.thenReject == "function" && deferred.thenReject(deferred.promise, arguments);
        });
        if (localVal !== null) {
            deferred.loadingCallback && deferred.loadingCallback(localVal);
        }
        var remoteUrl = url ? url : $rootScope.remoteUrl + key;
        this.showLoading = showLoading;
        this.$http(remoteUrl, "GET", data, deferred, localKey);
        return deferred.promise;
    };
    dataService.prototype.g = function (url, data, showLoading) {
        this.showLoading = showLoading;
        var deferred = $defer.get();
        this.$http($rootScope.remoteUrl + url, "GET", data, deferred, false);
        return deferred.promise;
    };
    dataService.prototype.p = function (url, data, showLoading) {
        var deferred = $defer.get();
        this.showLoading = showLoading;
        this.$http($rootScope.remoteUrl + url, "POST", data, deferred, false);
        return deferred.promise;
    };
    return {
        closeLoading: function () {
            var gData = new dataService();
            return gData.closeLoading();
        },
        g: function () {
            var gData = new dataService();
            return gData.g.apply(gData, arguments);
        },
        p: function () {
            var gData = new dataService();
            return gData.p.apply(gData, arguments);
        },
        $g: function () {
            var gData = new dataService();
            return gData.$g.apply(gData, arguments);
        },
        $p: function () {
            var gData = new dataService();
            return gData.$p.apply(gData, arguments);
        },
        remove: function () {
            var gData = new dataService();
            return gData.remove.apply(gData, arguments);
        },
        $r: function () {
            var gData = new dataService();
            return gData.$r.apply(gData, arguments);
        },
        $d: function () {
            var gData = new dataService();
            return gData.$d.apply(gData, arguments);
        }

    };
});