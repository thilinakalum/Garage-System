(function () {
    angular.module("AppModule")
            .service("optionPane", function ($uibModal) {
                var ctrl = function (type, message, title) {
                    function Controller(modalInstance, $timeout) {
                        //modal instance
                        this.modalInstance = modalInstance;
                        this.timeout = $timeout;

                        //message
                        this.message = message;

                        //title
                        this.title = title;

                        //class and icon
                        switch (type) {
                            case 'primary':
                                this.optionPaneClass = 'option-pane-primary';
                                this.optionPaneIcon = 'glyphicon glyphicon-tag';
                                this.title = typeof this.title === 'undefined' ? 'Message' : this.title;
                                break;
                            case 'info':
                                this.optionPaneClass = 'option-pane-info';
                                this.optionPaneIcon = 'glyphicon-bell';
                                this.title = typeof this.title === 'undefined' ? 'Information' : this.title;
                                break;
                            case 'success':
                                this.optionPaneClass = 'option-pane-success';
                                this.optionPaneIcon = 'glyphicon-ok';
                                this.title = typeof this.title === 'undefined' ? 'Success' : this.title;
                                break;
                            case 'warning':
                                this.optionPaneClass = 'option-pane-warning';
                                this.optionPaneIcon = 'glyphicon-warning-sign';
                                this.title = typeof this.title === 'undefined' ? 'Warning' : this.title;
                                break;
                            case 'danger':
                                this.optionPaneClass = 'option-pane-danger';
                                this.optionPaneIcon = 'glyphicon-remove';
                                this.title = typeof this.title === 'undefined' ? 'Danger' : this.title;
                                break;
                            default:
                                this.optionPaneClass = 'option-pane-default';
                                this.optionPaneIcon = 'glyphicon-bell';
                                this.title = typeof this.title === 'undefined' ? 'Note' : this.title;
                                break;
                        }

                    }

                    Controller.prototype = {
                        continue: function () {
                            var scope = this;
                            this.timeout(function () {
                                scope.modalInstance.close();
                            }, 250);
                        }
                    };

                    return ['$uibModalInstance', '$timeout', Controller];
                };

                this.message = function (optionType, message, title) {
                    $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: './app/util/dialog/option-pane.html',
                        controller: ctrl(optionType, message, title),
                        controllerAs: '$ctrl',
                        size: 'md'
                    });
                };

                this.primaryMessage = function (message, title) {
                    this.message('primary', message, title);
                };

                this.infoMessage = function (message, title) {
                    this.message('info', message, title);
                };

                this.successMessage = function (message, title) {
                    this.message('success', message, title);
                };

                this.warningMessage = function (message, title) {
                    this.message('warning', message, title);
                };

                this.dangerMessage = function (message, title) {
                    this.message('danger', message, title);
                };

                this.defaultMessage = function (message, title) {
                    this.message('default', message, title);
                };

            });
}());

