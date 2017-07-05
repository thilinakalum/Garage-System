(function () {
    angular.module("AppModule")
            .controller("UserController", function ($scope, UserModel, Notification) {
                $scope.model = new UserModel();
                $scope.ui = {};

                console.log("Controller");
                $scope.ui.login = function () {
                    $scope.model.userLogin()
                            .then(function (data) {
//                                     $cookies.put('userLoginCookies', data);                      
                            }, function (data) {
                                if (data.length > 0) {
                                    Notification.error("Same user name avalable  !! contact your system admin");
                                }else{
                                    Notification.error("User Name or password is wrong..!!!");
                                }
                            });
                };

                $scope.ui.init = function () {
                    console.log("init()");
                };
                $scope.ui.init();
            });
}());