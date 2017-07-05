(function () {
    angular.module("AppModule")
            .service("UserService", function ($http, SystemConfig) {
                this.checkUserNameAndPassword = function (userName, password) {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/login/find-by-user-name-and-password/" +userName + "/" + password );
                };
            });
}());

