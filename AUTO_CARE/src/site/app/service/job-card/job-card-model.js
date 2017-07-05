(function () {
    var factory = function ($q, JobCardService, JobCardModelFactory, CategoryModelFactory) {
        function JobCardModel() {
            this.constructor();
        }

        JobCardModel.prototype = {
            jobCard: null,
            categoryDetail: {},
            searchKeyword: null,
            showSuggestions: false,
            searchSuggestions: [],
            imagemodel: [],
            //uib-typeahead
            vTypeList: [],
            vMakeList: [],
            vModelList: [],
            clientList: [],
            insCompanyList: [],
            categoryList: [],
            descriptionList: [],
            discriptionSelectedList: [],
            categoryDetailList: [],
            pendingJobCardList: [],
            //constuctor
            constructor: function () {
                var that = this;
                console.log("constructed model");
                this.categoryDetail = CategoryModelFactory();
                JobCardService.getVehicleType()
                        .success(function (data) {
                            that.vTypeList = data;
                        });
                JobCardService.getVehicleMake()
                        .success(function (data) {
                            that.vMakeList = data;
                        });
                JobCardService.getVehicleModel()
                        .success(function (data) {
                            that.vModelList = data;
                        });
                JobCardService.getInsCompany()
                        .success(function (data) {
                            that.insCompanyList = data;
                        });
                JobCardService.findAllCategory()
                        .success(function (data) {
                            that.categoryList = data;
                        });
                JobCardService.findAllDescription()
                        .success(function (data) {
                            that.descriptionList = data;
                        });
                JobCardService.findAllCustomer()
                        .success(function (data) {
                            that.clientList = data;
                        });
            },
            loadAllCategoryDetails: function (jobNo) {
                var that = this;
                JobCardService.findAllCategoryDetail(jobNo)
                        .success(function (data) {
                            that.categoryDetailList = data;
                        });
            },
            clear: function () {
                this.jobCard = {};
                this.searchKeyword = null;
            },
            newJobCard: function () {
                this.jobCard = new JobCardModelFactory();
                this.searchKeyword = this.jobCard.vehicleNo;
            },
            setJobCard: function (jobCard) {
                this.jobCard = jobCard;
                this.loadAllCategoryDetails(jobCard.jobNo);
                this.searchKeyword = this.jobCard.vehicleNo;
//                this.jobCard.jobNo = null;
            },
            saveJobCard: function () {
                var that = this;
                console.log(this.jobCard);
                var customer = this.jobCard.customer;
                this.jobCard.customer = customer;
                var defer = $q.defer();
                JobCardService.saveJobCard(JSON.stringify(that.jobCard))
                        .success(function (data) {
                            defer.resolve(data);
                        })
                        .error(function (data) {
                            console.log("ERROR:" + data);
                            defer.reject();
                        });
                return defer.promise;
            },
            checkJobCardStatus: function (vehicleNo) {
                var that = this;
                var defer = $q.defer();
                JobCardService.findPendingJobCard(vehicleNo)
                        .success(function (data) {
                            this.pendingJobCardList = data;
                            defer.resolve(data);
                        })
                        .error(function () {
                            defer.reject();
                        });
                return defer.promise;
            },
            getCustomerByNic: function (indexNo) {
                var that = this;
                angular.forEach(this.clientList, function (values) {
                    if (values.customerNo === indexNo) {
                        that.jobCard.customer = values;
                        return;
                    }
                });
            },
            getCustomerByMobileNo: function (indexNo) {
                var that = this;
                angular.forEach(this.clientList, function (values) {
                    if (values.customerNo === indexNo) {
                        that.jobCard.customer = values;
                        return;
                    }
                });
            },
            //load vehicles
            findByVehicleNumber: function () {
                var that = this;
                JobCardService.findByVehicleNumber(this.searchKeyword)
                        .success(function (data) {
                            that.searchSuggestions = data;
                        })
                        .error(function (e) {
                            that.searchSuggestions = [];
                        });
            },
            //load vehicle type
            vTypeLabel: function (indexNo) {
                var vmake = "";
                angular.forEach(this.vTypeList, function (value) {
                    if (value.vmake === parseInt(indexNo)) {
                        vmake = value.vmake;
                        return;
                    }
                });
                return vmake;
            },
            //Image downloard
            downloardImage: function (jobNo) {
                var that = this;
                var defer = $q.defer();
                JobCardService.imageDownloard(jobNo)
                        .success(function (data) {
                            that.imagemodel = data;
                            defer.resolve(data);
                        })
                        .error(function (data) {
                            defer.reject(data);
                        });
                return defer.promise;
            },

//saveCategoryList
            saveCategoryDatail: function () {
                var that = this;
                var defer = $q.defer();
                this.saveDescription(this.categoryDetail.itemDescription);
                JobCardService.saveCategoryDetail(JSON.stringify(this.categoryDetail), that.jobCard.jobNo)
                        .success(function (data) {
                            that.categoryDetailList.push(data);
                            that.categoryDetail = {};
                            defer.resolve(data);
                        })
                        .error(function (data) {
                            defer.reject(data);
                        });
                return defer.promise;
            },
            saveDescription: function (description) {
                var data = this.checkCategoryDescriptionAvalability(description);
                if (data) {
                    console.log("this item already exists !!!");
                } else {
                    var objects = {
                        "description": data
                    };
                    JobCardService.saveDescription(JSON.stringify(objects))
                            .success(function (data) {
                                this.descriptionList.push(data);
                            })
                            .error(function () {
                                console.log("saveDiscription fail !!!");
                            });
                }
            },
            checkCategoryDescriptionAvalability: function (discription) {
                var data = "";
                angular.forEach(this.descriptionList, function (values) {
                    if (values.itemDes === discription) {
                        data = values;
                        return;
                    }
                });
                return data;
            },
            deleteCategoryDetail: function (indexNo, index) {
                var that = this;
                var defer = $q.defer();
                JobCardService.deleteCategoryDetail(indexNo)
                        .success(function (data) {
                            that.categoryDetailList.splice(index, 1);
                            defer.resolve(data);
                        })
                        .error(function (data) {
                            console.log("Category Detail delete Error !!!");
                            defer.reject(data);
                        });
                return defer.promise;
            },
            searchCategoryWiseDescription: function (category) {
                var that = this;
                that.discriptionSelectedList = [];
                //empty table data list
                if (that.categoryDetailList.length === 0) {
                    that.discriptionSelectedList = [];
                    that.discriptionSelectedList = that.descriptionList;
                } else {
                    angular.forEach(that.categoryDetailList, function (categoryValues) {
                        // table get 
                        if (categoryValues.category === category) {
                            that.discriptionSelectedList = [];
                            angular.forEach(that.descriptionList, function (itemDescriptionValues) {
                                if (categoryValues.itemDescription !== itemDescriptionValues.itemDes) {
                                    that.discriptionSelectedList.push(itemDescriptionValues);
                                    console.log(that.discriptionSelectedList.length);
                                }
                            });
                        } else {
                            that.discriptionSelectedList = [];
                            that.discriptionSelectedList = that.descriptionList;
                        }
                    });
                }
            }
        };
        return JobCardModel;
    };
    angular.module("AppModule")
            .factory("JobCardModel", factory);
}());