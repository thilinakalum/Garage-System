(function () {
    var factory1 = function () {
        function JobCard() {

        }
        JobCard.prototype = {
            "jobNo": null,
            "jobDate": null,
            "inTime": null,
            "vehicleNo": null,
            "type": null,
            "make": null,
            "model": null,
            "jobC":null,
            "inMillage": null,
            "engineNo": null,
            "chasieNo": null,
            "madeYear": null,
            "claimNo": null,
            "accidentDate": null,
            "insComNo" : {
                "comNo" : null,
                "comName" : null,
                "userId" : null
            },
            "customer": {
                "customerNo": null,
                "name": null,
                "nic": null,
                "mobileNo": null
            }
        };
        return JobCard;
    };
    angular.module("AppModule")
            .factory("JobCardModelFactory", factory1);

    var factory = function () {
        function CategoryDetail() {

        }
        CategoryDetail.prototype = {
            "indexNo": null,
            "jobNo": null,
            "category": null,
            "itemDescription": null
        };
        return CategoryDetail;
    };
    angular.module("AppModule")
            .factory("CategoryModelFactory", factory);
    
}());
