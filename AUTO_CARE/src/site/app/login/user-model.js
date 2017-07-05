(function () {
    var factory = function ($q, UserService, UserModelFactory, $location) {
        function UserModel() {
            this.constructor();
        }

        UserModel.prototype = {
            user: {},
            userList: [],
        

            constructor: function () {
                this.user = UserModelFactory();
            },
            userLogin: function () {
                var that = this;
                var password = that.user.password;
                var userName = that.user.userName;
                var defer = $q.defer();
                UserService.checkUserNameAndPassword(userName, password)
                        .success(function (data) {
                            if (data.length === 1) {
                                if ($location.path() === "/") {
                                    that.userThru = true;
                                    $location.path("/job-card");
                                }
                            } else {
                                defer.reject(data);
                            }
                        })
                        .error(function (data) {
                            $location.path("/");
                            defer.reject(data);
                        });
                return defer.promise;
            }

        };
        return UserModel;
    };

    angular.module("AppModule")
            .factory("UserModel", factory);
}());