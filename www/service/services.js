var prosumer_services = angular.module('starter.services', []);
prosumer_services.factory('$', function () {
      return function (string) {
        return angular.element(document.querySelector(string));
      }
    })
    .factory("$tips", function ($q, $ionicLoading, $timeout, $ionicPlatform, $ionicPopup) {
      return {
        show: function (mstime, types) {
          var deferred = $q.defer();
          var template = '';
          if (typeof types != "string") {
            types = "ok";
          }
          switch (types) {
            case "ok":
              template = '<div style="color:#fff"><i class="ion-android-done"></i></div>';
              break;
            default:
              template = types;
          }
          $ionicLoading.show({template: template});
          $timeout(function () {
            $ionicLoading.hide();
            deferred.resolve();
          }, mstime);
          return deferred.promise;
        },
        showLoading: function () {
          return $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner>'
          });
        },
        hideLoading: function () {
          return $ionicLoading.hide();
        },
        alert: function (message, okText) {
          if (window.location.protocol == "http:") {
            return $ionicPopup.alert({title: "提示", template: message, okText: okText || '知道了'});
          } else {
            var deferred = $q.defer();
            $ionicPlatform.ready(function () {
              navigator.notification.alert(message, function () {
                deferred.resolve();
              }, '', okText || '知道了');
            });
            return deferred.promise;
          }
        },
        confirm: function (message, okText, cancelText) {
          if (window.location.protocol == "http:") {
            var deferred = $q.defer();
            $ionicPopup.confirm({
              title: "提示",
              template: message,
              okText: okText || '好',
              cancelText: cancelText || "取消"
            }).then(function (res) {
              if (res) {
                deferred.resolve();
              } else {
                deferred.reject();
              }
            });
            return deferred.promise;
          } else {
            var deferred = $q.defer();
            $ionicPlatform.ready(function () {
              navigator.notification.confirm(
                  message,
                  function (buttonIndex) {
                    if (buttonIndex == 2) {
                      deferred.resolve();
                    }
                    if (buttonIndex == 1) {
                      deferred.reject();
                    }
                  },
                  "",
                  [cancelText || '取消', okText || '好']
              );
            });
            return deferred.promise;
          }
        },
        prompt: function (message,isPwd, okText, cancelText) {
          if (window.location.protocol == "http:") {
            return $ionicPopup.prompt({
              title: "提示",
              inputType: isPwd ? "password" : "text",
              template: message,
              okText: okText || '好',
              cancelText: cancelText || "取消"
            });
          } else {
            var deferred = $q.defer();
            $ionicPlatform.ready(function () {
              if (isPwd) {
                window.plugins.pinDialog.prompt(message, function (results) {
                      if (results.buttonIndex == 1) {
                        deferred.resolve(results.input1);
                      }
                      if (results.buttonIndex == 2) {
                        deferred.reject(results.input1);
                      }
                    }, " ",
                    [ okText || '好',cancelText || '取消']
                );
              } else {
                navigator.notification.prompt(
                    message,
                    function (results) {
                      if (results.buttonIndex == 2) {
                        deferred.resolve(results.input1);
                      }
                      if (results.buttonIndex == 1) {
                        deferred.reject(results.input1);
                      }
                    }, "",
                    [cancelText || '取消', okText || '好']
                );
              }
            });
            return deferred.promise;
          }
        }


      }
    })
    .factory('$local', [function () {
      return {
        get: function localStorageServiceGet(key, defaultValue) {
          var stored = localStorage.getItem(key);
          try {
            stored = angular.fromJson(stored);
          } catch (error) {
            stored = null;
          }
          if (defaultValue && stored === null) {
            stored = defaultValue;
          }
          return stored;
        },
        set: function localStorageServiceUpdate(key, value) {
          if (value) {
            localStorage.setItem(key, angular.toJson(value));
          }
        },
        remove: function localStorageServiceRemove(key) {
          localStorage.removeItem(key);
        }
      };
    }])
    .factory("$g", function ($q, $data, $rootScope) {
      return function (url, data, showLoading) {
        var deferred = $data.$defer();
        $data.showLoading = showLoading;
        $data.$http($rootScope.remoteUrl + url, "GET", data, deferred, false);
        return deferred.promise;
      }
    })
    .factory("$p", function ($q, $data, $rootScope) {
      return function (url, data, showLoading) {
        var deferred = $data.$defer();
        $data.showLoading = showLoading;
        $data.$http($rootScope.remoteUrl + url, "POST", data, deferred, false);
        return deferred.promise;
      }
    })
    .factory('$data', function ($q, $local, appserver, $http, $rootScope, $tips, $location, $ionicPlatform) {
      return new function () {
        this.showLoading = null;
        this.$defer = function () {
          var deferred = $q.defer();
          deferred.promise.success = function (successFunc) {
            deferred.promise.successFunc = successFunc;
            return deferred.promise;
          };
          deferred.promise.error = function (successFunc) {
            deferred.promise.errorFunc = successFunc;
            return deferred.promise;
          };
          deferred.promise.then(function (data) {
            typeof deferred.promise.successFunc == "function" && deferred.promise.successFunc(data);
          }, function (data) {
            typeof deferred.promise.errorFunc == "function" && deferred.promise.errorFunc(data);
          });
          return deferred;
        };
        this.request = function (remoteUrl, method, data, deferred, localKey) {
          $http({
            method: method || "GET",
            url: remoteUrl,
            params: method == "POST" ? null : data,
            data: method == "POST" ? data : null,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
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
            $tips.hideLoading();
            $tips.alert(err || remoteUrl).then(function () {
              deferred.reject({code: "HTTP_ERR", info: err, status: status});
            });
          });
        };
        this.$http = function (remoteUrl, method, data, deferred, localKey) {
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
        this.$g = function (key, data, url, showLoading) {
          var dataStr = data ? "." + angular.toJson(data) : "";
          var localKey = "$data.get." + key + dataStr;
          var localVal = $local.get(localKey);

          var deferred = this.$defer();
          if (localVal !== null) {
            deferred.resolve(localVal);
            return deferred.promise;
          }
          var remoteUrl = url ? url : $rootScope.remoteUrl + key;
          this.showLoading = showLoading;
          this.$http(remoteUrl, "GET", data, deferred, localKey);
          return deferred.promise;
        };
        this.$p = function (key, data, url, showLoading) {
          var dataStr = data ? "." + angular.toJson(data) : "";
          var localKey = "$data.post." + key + dataStr;
          var localVal = $local.get(localKey);
          var deferred = this.$defer(localKey);
          if (localVal !== null) {
            deferred.resolve(localVal);
            return deferred.promise;
          }
          var remoteUrl = url ? url : $rootScope.remoteUrl + key;
          this.showLoading = showLoading;
          this.$http(remoteUrl, "POST", data, deferred, localKey);
          return deferred.promise;
        };
        this.call = function (key, callback) {
          var localKey = "$data.call." + key;
          var localVal = $local.get(localKey);
          var deferred = this.$defer();
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
        this.$r = function (update) {
          var deferred = this.$defer();
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
        this.remove = function (removeOptions) {
          var deferred = this.$defer(false);
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
        this.$d = function (key, data, url, showLoading) {
          var dataStr = data ? "." + angular.toJson(data) : "";
          var localKey = "$data.get." + key + dataStr;
          var localVal = $local.get(localKey);
          var deferred = $q.defer();

          deferred.promise.error = function (successFunc) {
            deferred.promise.errorFunc = successFunc;
            return deferred.promise;
          };
          deferred.promise.loading = function (callback) {
            deferred.promise.loadingCallback = callback;
            return deferred.promise;
          };
          deferred.promise.done = function (callback) {
            deferred.promise.doneCallback = callback;
            return deferred.promise;
          };
          deferred.promise.then(function (data) {
            typeof deferred.promise.doneCallback == "function" && deferred.promise.doneCallback(data);
          }, function (data) {
            typeof deferred.promise.errorFunc == "function" && deferred.promise.errorFunc(data);
          });
          if (localVal !== null) {
            deferred.promise.loadingCallback && deferred.promise.loadingCallback(localVal);
          }
          var remoteUrl = url ? url : $rootScope.remoteUrl + key;
          this.showLoading = showLoading;
          this.$http(remoteUrl, "GET", data, deferred, localKey);
          return deferred.promise;
        };

      };
    })
    .factory('$timer', function ($interval) {
      var $timer = {};
      $timer.run = function (endTime, startTime, $scope, interval) {
        return $interval(function () {
          var endTimeObj = new Date(endTime);
          var startTimeObj = startTime ? new Date(startTime) : new Date();

          var ts = endTimeObj - startTimeObj;//计算剩余的毫秒数
          if (ts < 0) {
            $scope.$timer = "0秒";
            return;
          }
          var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
          var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
          var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
          var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数

          var $return = ""
          if (dd > 0) {
            $return += dd + "天";
          }
          if (hh > 0) {
            $return += hh + "小时";
          }
          if (mm > 0) {
            $return += mm + "分";
          }
          if (mm > 0) {
            $return += mm + "分";
          }

          $scope.$timer = $return + ss + "秒";
        }, interval || 1000);
      };
      $timer.stop = function (timer) {
        $interval.cancel(timer);
      };
      return $timer;
    })
    .factory('$formValid', function ($tips) {
          return function (formRules, data, type) {
            if (!formRules) {
              return true;
            }
            var strlen = function strlen(str) {
              var len = 0;
              for (var i = 0; i < str.length; i++) {
                var c = str.charCodeAt(i);
                //单字节加1
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                  len++;
                }
                else {
                  len += 2;
                }
              }
              return len;
            };
            var trim = function (str) { //删除左右两端的空格
              return str.replace(/(^\s*)|(\s*$)/g, "");
            };
            data = data || {};
            var errorstr = "";
            for (var i in formRules) {
              if (typeof data[i] == "undefined") {
                data[i] = "";
              }
              for (var j in formRules[i]) {
                if (errorstr) {
                  break;
                }
                switch (j) {
                  case "required":
                    if (trim(data[i]) == 0) {
                      errorstr = formRules[i][j];
                    }
                    break;
                  case "minlen":
                    if (data[i] && strlen(data[i]) < formRules[i][j][0]) {
                      errorstr = formRules[i][j][1];
                    }
                    break;
                  case "maxlen":
                    if (data[i] && !strlen(data[i]) > formRules[i][j][0]) {
                      errorstr = formRules[i][j][1];
                    }
                    break;
                  case "mobile":
                    if (data[i] && !/^1[3-9]\d{9}$/.test(data[i])) {
                      errorstr = formRules[i][j];
                    }
                    break;
                  case "postcode":
                    if (data[i] && !/^[1-9]\d{5}$/.test(data[i])) {
                      errorstr = formRules[i][j];
                    }
                    break;
                  case "address":
                    if (!data[i] || data[i] == formRules[i][j][0]) {
                      errorstr = formRules[i][j][1];
                    }
                    break;
                  case "match":
                    if (data[i] != data[formRules[i][j][0]]) {
                      errorstr = formRules[i][j][1];
                    }
                    break;
                }
              }
              if (errorstr) {
                break;
              }
            }
            if (!errorstr) {
              return true;
            }
            switch (type) {
              case "alert":
              default:
                $tips.alert(errorstr);
            }
            return false;
          }
        }
    )

;

