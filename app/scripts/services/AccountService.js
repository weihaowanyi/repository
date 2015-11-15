'use strict';

var katana = angular.module('katana');
katana.factory('AccountService', ['$localStorage', function($localStorage) {
    var account = $localStorage.user;
    return {
        getAccount : function (){
            return account;
            //JSON.parse(account);
        }
    }
}]);
