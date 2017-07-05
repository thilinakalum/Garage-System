(function () {
    angular.module("AppModule")
            .controller("JobCardController", function ($scope, $filter, JobCardModel, Notification, ConfirmPane, SystemConfig) {
                $scope.imagemodelX = [];
                $scope.ui = {};
                $scope.ui.viewDiv = 'CLIENT';
                $scope.ui.mode = "VEHICLE";//or IMAGE or ITEM
                $scope.ui.imageShowMode1 = 'NotAvalable';//or IMAGE VIEW
                $scope.ui.imageShowMode2 = 'NotAvalable';//or IMAGE VIEW
                $scope.ui.imageShowMode3 = 'NotAvalable';//or IMAGE VIEW
                $scope.ui.imageShowMode4 = 'NotAvalable';//or IMAGE VIEW

                $scope.ui.imageModel = [];
                $scope.imagemodel = [],
                        $scope.model = new JobCardModel();

                $scope.ui.toggleMode = function () {
                    if ($scope.ui.mode === 'VEHICLE') {
                        $scope.ui.mode = 'IMAGE';
                    } else {
                        $scope.ui.mode = 'VEHICLE';
                    }
                };

                $scope.ui.newCustomer = function () {
                    $scope.model.jobCard.customer = {};
                };

                $scope.ui.setNewJobCard = function () {
                    $scope.model.newJobCard();
                };

                //saveJobCard
                $scope.ui.saveJobCard = function () {
                    $scope.model.saveJobCard()
                            .then(function (data) {
                                $scope.model.jobCard.jobNo = data.jobNo;
                                ConfirmPane.successConfirm("job-card save success !!! \n\ Do you want capture new Images ?")
                                        .confirm(function () {
                                            $scope.ui.toggleMode();
                                        })
                                        .discard(function () {
                                            $scope.ui.setJobWork();
//                                            $scope.model.clear();
                                        });
                            }, function () {
                                Notification.error("Save job-card fail !!!");
                            });
                };

                $scope.ui.setExistingJobCard = function (jobCard) {

//                    var accidentDate = jobCard.accidentDate;
//                    jobCard.accidentDate = $filter('date')(accidentDate, 'yyyy-MM-dd');

                    var data = parseInt(jobCard.inMillage);
                    jobCard.inMillage = data;

                    var data = parseInt(jobCard.madeYear);
                    jobCard.madeYear = data;

                    if (jobCard.jobC === "N") {
                        ConfirmPane.warningConfirm("Pending Job Card Avalable for this Vehicle !!! Do you want Edit this job ")
                                .confirm(function () {
                                    console.log(jobCard);
                                    $scope.model.setJobCard(jobCard);
                                    //image load
                                    $scope.model.downloardImage(jobCard.jobNo)
                                            .then(function (data) {
                                                for (var i = 0; i < data.length; i++) {
                                                    $scope.imagemodelX[i] = SystemConfig.apiUrl + "/api/care-point/transaction/job-card/download-image/" + data[i];
                                                    console.log($scope.imagemodelX[i]);
                                                    $scope.ui.imageShowMode1 = 'Avalable';
                                                    $scope.ui.imageShowMode2 = 'Avalable';
                                                    $scope.ui.imageShowMode3 = 'Avalable';
                                                    $scope.ui.imageShowMode4 = 'Avalable';
                                                }
                                            }, function () {

                                            });
                                })
                                .discard(function () {
                                    ConfirmPane.warningConfirm("Do u want to create another job card ..???")
                                            .confirm(function () {
                                                jobCard.jobC = "Y";
                                                $scope.model.setJobCard(jobCard);
                                            })
                                            .discard(function () {

                                            });
                                });
                    } else {
                        $scope.model.setJobCard(jobCard);
                    }
                };

                $scope.ui.vehicleTextChange = function (e) {
                    if (e.keyCode === 32) {
                        $scope.$apply(function () {
                            var newV = $scope.model.jobCard.vehicleNo;
                            $scope.model.jobCard.vehicleNo = newV + "-";
                        });
                    }
                };

                $scope.ui.nextButton = function () {
                    $scope.ui.viewDiv = 'VEHICLE';
                };

                $scope.ui.uploadForm = function () {
                    ConfirmPane.successConfirm("Do you want to Save Images ?")
                            .confirm(function () {
                                var jobNo = $scope.model.jobCard.jobNo;
                                for (var i = 0; i < $scope.imagemodel.length; i++) {
                                    var url = SystemConfig.apiUrl + "/api/care-point/transaction/job-card/upload-image/" + jobNo + "/" + i;
                                    var formData = new FormData();
                                    formData.append("file", $scope.imagemodel[i]);

                                    var xhr = new XMLHttpRequest();
                                    xhr.open("POST", url);
                                    xhr.send(formData);
                                }
                                $scope.ui.setJobWork();

                            })
                            .discard(function () {
                                ConfirmPane.dangerConfirm("Do you want to Delete All Images ?")
                                        .confirm(function () {
                                            $scope.imagemodelX = [];
                                            $scope.ui.setJobWork();
                                        })
                                        .discard(function () {
                                            $scope.ui.setJobWork();
                                        });
                            });
                };

                $scope.ui.showImg = function () {
                    if ($scope.imagemodel.length === 0) {
                        $scope.ui.showImg === 2;
                    }
                };

                $scope.ui.setJobWork = function () {
                    ConfirmPane.successConfirm("Do you want add jobs ?")
                            .confirm(function () {
                                $scope.ui.mode = "ITEM";
                            })
                            .discard(function () {
                                $scope.ui.mode = "VEHICLE";
                                $scope.ui.viewDiv = 'CLIENT';
                                $scope.ui.imageShowMode1 = 'NotAvalable';
                                $scope.ui.imageShowMode2 = 'NotAvalable';
                                $scope.ui.imageShowMode3 = 'NotAvalable';
                                $scope.ui.imageShowMode4 = 'NotAvalable';
                                $scope.imagemodel = [];
                                $scope.imagemodelX = [];
                                $scope.model.clear();

                            });
                };

                $scope.ui.changeFunction = function (event) {
                    if ($scope.ui.imageShowMode1 === 'NotAvalable') {
                        $scope.ui.imageShowMode1 = 'Avalable';
                    } else if ($scope.ui.imageShowMode2 === 'NotAvalable') {
                        $scope.ui.imageShowMode2 = 'Avalable';
                    } else if ($scope.ui.imageShowMode3 === 'NotAvalable') {
                        $scope.ui.imageShowMode3 = 'Avalable';
                    } else if ($scope.ui.imageShowMode4 === 'NotAvalable') {
                        $scope.ui.imageShowMode4 = 'Avalable';
                    }
                    var files = event.target.files;
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        $scope.imagemodel.push(file);

                        var reader = new FileReader();
                        reader.onload = $scope.imageIsLoaded;
                        reader.readAsDataURL(file);
                    }
                };

                $scope.imageIsLoaded = function (e) {
                    $scope.$apply(function () {
                        $scope.imagemodelX.push(e.target.result);
                    });
                };


                $scope.ui.showImg = function () {
                    if ($scope.imageModel) {
                        $scope.ui.showImg;
                    }
                };

                $scope.ui.setNextMillage = function () {
                    var inMilage = parseInt($scope.model.jobCard.inMillage);
                    $scope.model.jobCard.nextMillage = parseInt(inMilage + 5000);
                };

                $scope.ui.categoryDatail = function () {
                    $scope.model.saveCategoryDatail()
                            .then(function () {
                                console.log("success");
                            }, function () {
                                console.log("fail");
                            });
                };

                $scope.ui.deleteCategoryDetail = function (indexNo, index) {
                    $scope.model.deleteCategoryDetail(indexNo, index)
                            .then(function () {
                                Notification.success("Delete success !!!");
                            }, function () {
                                Notification.success("Delete Fail !!!");
                            });
                };




//                $scope.categories = ["REPAIR WORKS", "PAINT WORKS", "GENERAL ITEMS", "SPAIR PARTS", "LABOUR CHARGES"];
//                $scope.descriptions = ["NEW ITEM", "FRONT BUFFER", "BACK BUFFER", "REPLACE SOCKET", "SIDE PANEL"];

                $scope.tempCategoryDetails = {};
                $scope.categoryDetails = []; //{category:'', description:''}

                $scope.ui.addCategoryDetail = function () {
                    if ($scope.tempCategoryDetails.category && $scope.tempCategoryDetails.description) {
                        $scope.categoryDetails.push($scope.tempCategoryDetails);
                        $scope.tempCategoryDetails = {};
                        console.log($scope.categoryDetail);
                    }
                };

                $scope.ui.finish = function () {
                    Notification.success("Success");
                    $scope.ui.viewDiv = 'CLIENT';
                    $scope.ui.mode = "VEHICLE";//or IMAGE or ITEM
                    $scope.model.jobCard = {};
                    $scope.model.categoryDetail = {};
                    $scope.model.jobCard = {};
                    $scope.model.searchKeyword = null;
                };


                $scope.ui.init = function () {
                    $scope.$watch('model.searchKeyword', function (newV, oldV) {
                        $scope.model.showSuggestions = newV && newV.length;

                        if (newV && newV.length >= 2) {
                            //load from server
                            $scope.model.findByVehicleNumber();
                        }
                    });

                    $scope.$watch('model.jobCard', function (newVal) {
                        if (newVal) {
                            $scope.model.showSuggestions = !$scope.model.jobCard;
                        }
                    });


//                    $scope.$watch('model.jobCard.vehicleNo', function (newV) {
//                        console.log(newV);
//                        $scope.model.jobCard.vehicleNo = newV ? newV.split(" ").join("-") : newV;
//                        console.log($scope.model.jobCard.vehicleNo);
//                        $scope.$digest();
//                    });
                };
                $scope.ui.init();
            });

    angular.module("AppModule")
            .filter("categoryFilter", function ($filter) {
                return function (input, viewValue, category, categoryDetails) {
                    var suggestions = $filter('filter')(input, viewValue);
                    var usedDescriptions = $filter('filter')(categoryDetails, {"category": category})
                            .map(function (categoryDetail) {
                                return categoryDetail.description;
                            });

                    return suggestions.filter(function (description) {
                        return usedDescriptions.indexOf(description) === -1;
                    });
                };
            });
}());