(function () {
    
    //index module
    angular.module("AppModule", [
        "ngRoute",
        "ngAnimate",
        "ui.bootstrap",
        "ui-notification",
        "angular.filter"
    ]);

    //constants
    angular.module("AppModule")
            .constant("SystemConfig", {
                apiUrl:
                        location.hostname === 'localhost'
                        ? "http://localhost:8080"
                        : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "")
            });


    //route config
    angular.module("AppModule")
            .config(function ($routeProvider) {
                $routeProvider
                        //system
                        .when("/", {
                            templateUrl: "app/login/login.html",
                            controller: "UserController"
                        })
                        .when("/job-card", {
                            templateUrl: "app/service/job-card/job-card.html",
                            controller: "JobCardController"
                        })
                        .otherwise({
                            redirectTo: "/"
                        });

            });
}());
