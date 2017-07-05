(function () {
    var factory = function () {
        function User() {

        }

        User.prototype = {
            "indexNo": null,
            "logid": null,
            "name": null,
            "userName": null,
            "password": null,
            "active": null,
            "userTrue":false
        };
        
        return User;
    };
    angular.module("AppModule")
            .factory("UserModelFactory", factory);
}());