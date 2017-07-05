(function () {
    angular.module("AppModule")
            .service("JobCardService", function ($http, SystemConfig) {

                this.findByVehicleNumber = function (vehicleNumber) {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/find-by-vehicle/" + vehicleNumber);
                };
                
                this.getVehicleType = function () {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/all-vehicle-types");
                };
                
                this.getVehicleMake = function () {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/all-vehicle-makes");
                };
                
                this.getVehicleModel = function () {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/all-vehicle-models");
                };
                
                this.getVehicleMake = function () {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/all-vehicle-makes");
                };
                
                this.getInsCompany = function () {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/all-insurance-companys");
                };
                
                this.findAllCustomer = function () {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/find-All-customer");
                };
                
                this.findAllCategory = function () {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/all-category");
                };
                
                this.findAllDescription = function () {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/all-description");
                };
                
                this.saveDescription = function (data) {
                    return $http.post(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/save-description", data);
                };
                
                this.deleteCategoryDetail = function (indexNo) {
                    return $http.delete(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/delete-category-detail/"+ indexNo );
                };
                
                this.findAllCategoryDetail = function (jobNo) {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/all-CategoryDetail/"+ jobNo );
                };

                this.saveJobCard = function (jobCard) {
                    return $http.post(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/save-job-card", jobCard);
                };
                
                this.imageUpload = function () {
                    return $http.post(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/upload-image");
                };
                
                this.imageDownloard = function (jobCard) {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/image-names/"+jobCard);
                };
                
                this.saveCategoryDetail = function (categorydetail,jobNo) {
                    return $http.post(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/save-category-detail/" + jobNo, categorydetail);
                };
                
                this.findPendingJobCard = function (vehicleNo) {
                    return $http.get(SystemConfig.apiUrl + "/api/care-point/transaction/job-card/pending-job-card/" + vehicleNo);
                };
            });
}());