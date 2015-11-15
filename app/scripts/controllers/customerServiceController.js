'use strict';

var katana = angular.module('katana');
katana.controller('CustomerServiceController', function($scope,$stateParams) {
    console.log($stateParams.status);
    alert($stateParams.status+"--------------------here is the one--------------------------");
})
