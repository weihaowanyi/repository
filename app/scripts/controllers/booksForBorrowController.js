'use strict';

var katana = angular.module('katana');
katana.controller('BooksForBorrowController', function ($scope,Account) {
    Account.get(function(account){
        $scope.account = account;
    })
})
